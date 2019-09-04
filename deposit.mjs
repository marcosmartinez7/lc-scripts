import {address2, keystore2, partner2, tokenAbi, tokenAddress, tokenNetworkAbi, tokenNetworkAddress} from "./constants";
import Web3 from "web3"

const channelId = 50;
const  web3 = new Web3('http://localhost:4444');
const decryptedAccount = web3.eth.accounts.decrypt(keystore2, 'infuy123');
const token=  new web3.eth.Contract(tokenAbi, tokenAddress);
const tokenNetwork=  new web3.eth.Contract(tokenNetworkAbi, tokenNetworkAddress);


web3.eth.getTransactionCount(address2, function(e, tc){
    console.log("Transaction count "+tc);
    const approval = {
        "nonce":web3.utils.toHex(tc),
        "gasPrice":"0x098bca5a00",
        "gasLimit":"0x012527",
        "to":tokenAddress,
        "value":"0x00",
        "data": token.methods.approve(tokenNetworkAddress, "1000000000000004").encodeABI(),
        "chainId":33
    };

    decryptedAccount.signTransaction(approval ,function(e,signed){
        console.log("Approval:" +signed.rawTransaction);

    });

    const deposit = {
        "nonce":web3.utils.toHex(tc+1),
        "gasPrice":"0x098bca5a00",
        "gasLimit":"0x0304b1",
        "to":tokenNetworkAddress,
        "value":"0x00",
        "data":tokenNetwork.methods.setTotalDeposit(channelId ,address2, "9000000000000003", partner2).encodeABI(),
        "chainId":33
    };

    decryptedAccount.signTransaction(deposit ,function(e,signed){
        console.log("Deposit: " +signed.rawTransaction);

    });
})



