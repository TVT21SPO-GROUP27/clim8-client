import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css';
 

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
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar