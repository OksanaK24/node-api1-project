import React, {useEffect, useState} from "react"
import axios from "axios"

import "./App.css"

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
        .get("http://127.0.0.1:1204/api/users")
        .then((result) => {
          console.log(result.data);
          setUsers(result.data)
        })
        .catch((error) => {
            console.log(error);
        })
  }, [])

  return (
    <div className="users">
      {
        users &&
        users.map(user => (
          <div className="user_card">
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
          </div>
        ))
      }
      
    </div>
  );
}

export default App;
