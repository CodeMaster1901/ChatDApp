//SPDX-License-Identifier : MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatDApp{
    //User struct definition
    struct user{
        string name;
        friend[] friendList;
        
    }
    // for the friend
    struct friend{
        address pubkey;
        string name;
    }

    //defining the message structure
    struct message{
        address sender; // displays the sender addrsss[name]
        uint256 timestamp; //used to display the message time
        string msg; // the message itself
    }

    struct allUserStruck{
        string name;
        address accoundAddress;
    }

    allUserStruck[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allmessages; // this will gice all details of all the communication between the friends

    //check user exists
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0; //this is just checking wether the length of the username is more than 0
    }

    //create the user account [to register]
    function createAccount(string calldata name) external {
        // we are using calldata to save gas fee
        // first check if user trying to make acc if they already have one
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0 , "Username cannot be empty");

        userList[msg.sender].name = name;

        getAllUsers.push(allUserStruck(name, msg.sender));
    }

    //retireve username
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name; 
    }

    //add friends
    function addFriend(address friend_key, string calldata name) external {
        //check wether friend is user or not and wether he has an account or not
        require(checkUserExists(msg.sender), "First Make an account");
        require(checkUserExists(friend_key), "User is not registered");
        //check for not adding themselves as a friend of themselves
        require(msg.sender != friend_key, "user cannot add themselves as a friend");
        require(checkAlreadyFriends(msg.sender,friend_key)==false, "You are already friends with this person");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender,userList[msg.sender].name);    
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool){
        //this checks if wether the friend is in the list of friends using the lengths
        if (userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;

            for(uint256 i = 0 ; i < userList[pubkey1].friendList.length ; i++){
                //this checks wether friend1 si connected to friend2 or not
                if(userList[pubkey1].friendList[i].pubkey == pubkey2){
                    return true;
                }
            }
        }
        return false;
    }

    function _addFriend(address mine, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[mine].friendList.push(newFriend);
    }

    // retureve all my friends
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    // get chat code - helps identify the message
    function _getChatCode(address pubkey1, address pubkey2 ) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }
        else{
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "you are not friends yet");

        bytes32 chatcode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allmessages[chatcode].push(newMsg);
    }

    //read the messages
    function readMessage(address friend_key)external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allmessages[chatCode];
    }

    function getAllAppUser() public view returns(allUserStruck[] memory){
        return getAllUsers;
    }

}