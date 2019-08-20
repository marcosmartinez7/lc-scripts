import {address2, keystore2, tokenNetworkAbi, tokenNetworkAddress} from "./constants";
import Web3 from "web3"

const  web3 = new Web3('http://localhost:4444');
const decryptedAccount = web3.eth.accounts.decrypt(keystore2, 'infuy123');
const tokenNetwork=  new web3.eth.Contract(tokenNetworkAbi, tokenNetworkAddress);

const participant1="0x3278deed4ee3de26bb53ffb82f4be82a6bb66d19";
const participant2="0x2582D3dC3E54093EaE255E90136Aa1925F1ec0d9";

web3.eth.getTransactionCount(address2, function(e, tc){
    console.log("Transaction count "+tc);
    const open = {
        "nonce":web3.utils.toHex(tc),
        "gasPrice":"0x098bca5a00",
        "gasLimit":"0x0304b1",
        "to":tokenNetworkAddress,
        "value":"0x00",
        "data": tokenNetwork.methods.openChannel(participant1, participant2, 500).encodeABI(),
        "chainId":33
    };

    decryptedAccount.signTransaction(open ,function(e,signed){
        console.log("Open:" +signed.rawTransaction);

    });
})



