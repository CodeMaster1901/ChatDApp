// this explains the functionalities that help communicate with smart contract
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

//internal import
import {CheckIfWalletIsConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature';

export const ChatDAppContext = React.createContext();
export const ChatDAppProvider = ({children}) => {
    //define sttae variables:
    const [account, setAccount ] = useState("");
    const [userName, setUserName] = useState("");
    const [friendList, setFirendList ] = useState([]);
    const [friendMsg, setFriendMsg ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists ] = useState([]);
    const [error, setError ] = useState("");

    //chat user data:
    //variables to display with whom im chatting
    const [currentUserName, setCurrentUserName ] = useState("");
    const [currentUserAddress, setCurrentUserAddress ] = useState("");

    const router = useRouter();

    // function to get all the req data when the page loads up:
    const fetchData = async() => {
        try{
            //get the smart contract, user account, user name, friends list of the user, list of all the users on the app
            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            const friendList = await contract.getMyFriendList();
            setFirendList(friendList);
            const userList = await contract.getAllAppUser();
            setUserLists(userList); 
        }
        catch(error){
            setError("Please install and connect to your wallet");
        }
    };

    useEffect(() => {
        fetchData()
    }, []); // the fetch data will get the wallet address details

    return (
        <ChatDAppContext.Provider value={{}}>
            {children}
        </ChatDAppContext.Provider>
    )
}

