import React, { useState } from 'react';
import axios from 'axios';

export function LuoKäyttäjä() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vahvistettuSalasana, vahvistaSalasana] = useState(null)
    const [error, setError] = useState(false)
    const url = "http://localhost:8080/users";

  const handleSubmit= async (e) => {
    e.preventDefault(); 
    if (password !== vahvistettuSalasana) {
      setError(true)
      return
    }

    try {
      const res = await axios.post(url, 
      {name: name, email: email, password: password});
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <h3>Create User</h3>
       <form onSubmit={handleSubmit}>
        <div>
            <input type="name" 
            value={name}
  	        placeholder = "Username"
            required
            onChange={e => setName(e.target.value)} />
        </div>
            <div>
                <input type="email"
                value={email}
                placeholder = "Email"
                required
                onChange={e => setEmail(e.target.value)} />
            </div>
                <div>
                    <input type="password" 
                    value={password}
                    placeholder="Password"
                    required
                    onChange={e => setPassword(e.target.value)} />
                </div>
              <div>
                <input type="password"
                value = {vahvistettuSalasana}
                placeholder="Confirm password"
                required
                onChange = {e => vahvistaSalasana(e.target.value)} />
              </div>
                <input type = "submit" />
        {error && <p>Passwords do not match!</p>}
      </form>
    </div>
  )
}