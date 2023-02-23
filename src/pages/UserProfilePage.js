import React from "react";
import { useContext, useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
const API_URL = /*process.env.REACT_APP_API_URL || */ "http://localhost:5005";


function UserProfilePage(props) {
    const navigate = useNavigate()
    const storedToken = localStorage.getItem('authToken');
    const {user, logOutUser} = useContext(AuthContext);
    console.log("the authenticater" , user)
    const deleteUser = () => {                    
        // Make a DELETE request to delete user
        axios
          .delete(`${API_URL}/api/users/delete`, { headers: { Authorization: `Bearer ${storedToken}`} }) 
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the SignUpPage.
        
            logOutUser()
              navigate("/signup");
          })
          .catch((err) => console.log(err));
      }; 
      
      //desplay UserBookList

        const [books, setBooks] = useState([]);
        const getUserBookList = () => {
        const storedToken = localStorage.getItem('authToken')
        
            axios
            .get(`${API_URL}/api/books`, { headers: { Authorization: `Bearer ${storedToken}`}})
            .then((response) => {response.data.map((book) => {
              return (
              book.author === user.username && setBooks(response.data))})
            })
        }
        
        useEffect(() => {
            getUserBookList()
        }, [books] );
   

  return (
<div>
       {user && 
        <div className="UserProfilePage">

      <h1>Welcome, {user.username}</h1> 
      <img className="UserProfileImg" alt="User profile"
             src={user.profileImage}/>
      <p>Status: {user.status}</p>
      <p>About you: {user.bio}</p>
      <br></br>
      <Link to="/users/edit"> 
             <button>Edit your profile</button></Link>
      
      <button onClick={deleteUser}>Delete your profile</button>
      
      <br></br>
      <h5>Your books:</h5>
      {console.log(user)}
      {user.books?.map((book)=>{
        return (
          <div>
          <h4>{book.title}</h4>
          </div>
        )
      })}
     
      <br></br>


       <br></br>
       <button>Add new book</button>


       
     
    </div>
    }
</div>
 
    
  )
}
 
export default UserProfilePage;