import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/" >Ilmasto</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link className="nav-link" to="/kirjaudu">Kirjaudu Sisään</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/luokayttaja">Luo Käyttäjä</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Visualisoinnit
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/1Visualisointi">Ilmasto 1850-2022</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar