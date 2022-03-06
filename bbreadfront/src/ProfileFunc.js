
import React, {useState, useEffect} from 'react'
import ProfileForm from './ProfileForm'
import axios from 'axios'
import FriendTable from './FriendTable'
import InventoryTable from './InventoryTable'
import { useHistory, useLocation } from 'react-router-dom';


function ProfileFunc() {

  let history = useHistory();
  let location = useLocation();
  let currentUser = location.state.user.username;
  const [users, setCharacters] = useState([]);
  
  function removeOneCharacter (index) {
    const deleted = users[index];
    const updated = users.filter((user, i) => {
        return i !== index
    });
    deleteBackend(deleted['_id']);
    setCharacters(updated);
  }
  
  async function deleteBackend(_id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + _id);
      return response.data.users_list;
      }
    catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;
    }
  }

  function updateList(person) { 
    makeGetCall(person).then( result => {
    /*if (result && result.status === 201)
       setCharacters([...characters, result.data] );*/
    });
  }
  
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  async function makeGetCall(person){
    try {
      const response = await axios.get('http://localhost:5000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function addFriend(){
    //dont know know what to return from put just because there is only a status that is sent back
    try {
      const response = await axios.put('http://localhost:5000/users', {user: currentUser , friend: "come"});
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function deleteFriend(){
    console.log("deletefriend");
  }

  useEffect(() => {
    fetchAll().then( result => {
    if (result)
      setCharacters(result);
    });
  }, [] );
  
  return (
    <div className="container">
      <FriendTable user={location.state.user}/>
      <InventoryTable user={location.state.user}/>
      <ProfileForm addFriend= {addFriend} deleteFriend={deleteFriend} />
    </div>
  );  
}

export default ProfileFunc;
