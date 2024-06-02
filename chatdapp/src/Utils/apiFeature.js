import {ethers} from "ethers";
import Web3Modal from "web3modal";
import {ChatDAppAddress, ChatDAppABI} from "../Context/constants";

export const CheckIfWalletIsConnected = async () => {
    try{
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method : "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    }

    catch (error) {
        console.log("Install Metamask");
    }
};

// this function is for connecting to wallet upon click events
export const connectWallet = async () => {
    try{
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method : "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    }

    catch (error) {
        console.log(error);
    }
};

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatDAppABI,ChatDAppAddress,signerOrProvider);

// these functions are abstracted because this is general functions used in any web3 application - can be resued
export const connectingWithContract = async () => {
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = new proviedr.getSigner();
        const contract = fetchContract(signer);
        return contract;
    }
    catch(error) {
        console.log(error);
    }
};

// convert timestamp to readable time
export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());
    const reatTime = newTime.getHours() + "/" + newTime.getMinutes() + "/" + newTime.getSeconds() + " Date:" + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();
};
