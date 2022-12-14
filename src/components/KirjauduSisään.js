import React, { useState } from 'react';
import axios from 'axios';

export function KirjauduSisään() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const url = "http://localhost:8080/login";

const handleSubmit= async (e) => {
  e.preventDefault(); 
  console.log(name, password)

  try {
    const res = await axios.post(url, 
    {name: name, password: password});
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
}

  return (
    <div>
    <h3>Login</h3>
     <form onSubmit={handleSubmit}>
      <div>
          <input type="name" 
          value={name}
          placeholder = "Username"
          required
          onChange={e => setName(e.target.value)} />
      </div>
      <div>
          <input type="password" 
          value={password}
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)} />
      </div>
      <input type = "submit" />
      {error && <p>False password/username</p>}
    </form>
  </div>
  )
}
