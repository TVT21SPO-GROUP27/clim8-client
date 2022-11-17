import axios from 'axios';
import React, { useState } from 'react';

export function LuoKäyttäjä() {
    const [name, setName] = useState("");
    const [sposti, setSposti] = useState("");
    const [salasana, setSalasana] = useState("");
    const [vahvistettuSalasana, vahvistaSalasana] = useState(null)
    const [error, setError] = useState(false)

  const handleSubmit= (e) => {
    e.preventDefault(); 
    if (salasana !== vahvistettuSalasana) {
      setError(true)
      return
    }

    console.log('nimi', name)
    console.log('sposti', sposti)
    console.log('salasana', salasana)
    console.log('vahvistettuSalasana', vahvistettuSalasana)
    
  }

  return (
    <div>
      <h3>Luo Käyttäjä</h3>
       <form onSubmit={handleSubmit}>
        <div>
            <input type="string" 
            value={name}
  	        placeholder = "Nimi"
            required
            onChange={e => setName(e.target.value)} />
        </div>
            <div>
                <input type="string"
                value={sposti}
                placeholder = "Sähköposti"
                required
                onChange={e => setSposti(e.target.value)} />
            </div>
                <div>
                    <input type="password" 
                    value={salasana}
                    placeholder="Salasana"
                    required
                    onChange={e => setSalasana(e.target.value)} />
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