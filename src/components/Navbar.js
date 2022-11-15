import React from 'react'
import { Link } from 'react-router-dom'
 

function Navbar() {
  return (
  <nav>
    <div class="container-fluid">
      <Link className="navbar-brand" to='/'>Sovellus</Link>
      <div>
        <ul>
          <li class="nav-item">
            <Link className="nav-link" to="/kirjaudu">Kirjaudu Sisään</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/luokayttaja">Luo Käyttäjä</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/tieto">Tieto</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/1Visualisointi">1. Visualisointi</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar