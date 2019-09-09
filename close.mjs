import {address2, keystore2, tokenNetworkAbi, tokenNetworkAddress} from "./constants";
import Web3 from "web3"

const  web3 = new Web3('http://localhost:4444');
const decryptedAccount = web3.eth.accounts.decrypt(keystore2, 'infuy');
const tokenNetwork=  new web3.eth.Contract(tokenNetworkAbi, tokenNetworkAddress);

const channel_identifier = 11;
const partner = "0x7c7BcD239ccC52E3873a15A5b173657cAB146295";
const balance_hash = '0x000000000000000000000000000000000000000000000000000000000000000';
const nonce = 0;
const additional_hash = '0x000000000000000000000000000000000000000000000000000000000000000';
const signature = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

web3.eth.getTransactionCount(address2, function(e, tc){
    console.log("Transaction count "+tc);
    const close = {
        "nonce":web3.utils.toHex(tc),
        "gasPrice":"0x098bca5a00",
        "gasLimit":"0x0304b1",
        "to":tokenNetworkAddress,
        "value":"0x00",
        "data": tokenNetwork.methods.closeChannel(channel_identifier, partner, balance_hash, nonce, additional_hash, signature).encodeABI(),
        "chainId":33
    };

    decryptedAccount.signTransaction(close ,function(e,signed){
        console.log("Close:" +signed.rawTransaction);

    });
})