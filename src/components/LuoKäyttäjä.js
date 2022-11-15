import React, { useState } from 'react';

export function LuoKäyttäjä() {
    const [name, setName] = useState("");
    const [sposti, setSposti] = useState("");
    const [salasana, setSalasana] = useState("");

    function PituusTarkistus() {
    return name.length > 0 && salasana.length > 0;
}

  return (
    <div>
    <h3>Kirjaudu sisään</h3>
    <form>
        <div>
            <label>Nimi</label>
            <input type="string" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
            <label>Sähköposti</label>
            <input type="string" value={sposti} onChange={e => setSposti(e.target.value)} />
        </div>
        <div>
            <label>Salasana</label>
            <input type="string" value={salasana} onChange={e => setSalasana(e.target.value)} />
        </div>
        <button block="true" size="lg" type="submit" disabled={!PituusTarkistus()}>
          Kirjaudu
        </button>
    </form>
    </div>
  )
}