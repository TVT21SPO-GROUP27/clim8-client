import axios from 'axios';
import React, { useState } from 'react';

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
      {username: name, email: email, password: password});
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
    /*console.log('nimi', name)
    console.log('sposti', sposti)
    console.log('salasana', salasana)
    console.log('vahvistettuSalasana', vahvistettuSalasana)*/
    
  }

  return (
    <div>
      <h3>Luo Käyttäjä</h3>
       <form onSubmit={handleSubmit}>
        <div>
            <input type="name" 
            value={name}
  	        placeholder = "Nimi"
            required
            onChange={e => setName(e.target.value)} />
        </div>
            <div>
                <input type="email"
                value={email}
                placeholder = "Sähköposti"
                required
                onChange={e => setEmail(e.target.value)} />
            </div>
                <div>
                    <input type="password" 
                    value={password}
                    placeholder="Salasana"
                    required
                    onChange={e => setPassword(e.target.value)} />
                </div>
              <div>
                <input type="password"
                value = {vahvistettuSalasana}
                placeholder="Vahvista salasana"
                required
                onChange = {e => vahvistaSalasana(e.target.value)} />
              </div>
                <input type = "submit" />
        {error && <p>Salasanat ei täsmää keskenään.</p>}
      </form>
    </div>
  )
}