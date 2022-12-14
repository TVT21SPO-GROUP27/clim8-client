import React from 'react'
import { Link } from 'react-router-dom'
 

function Navbar() {
  return (
<<<<<<< Updated upstream
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
=======
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/" >Clim8</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link className="nav-link" to="/kirjaudu">Login</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/luokayttaja">Create User</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Visualisations
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/1Visualisointi">Climate 1850-2022</Link></li>
            <li><Link class="dropdown-item" to="/3Visualisointi">Hawaii Mauna Loa Co2 1958-2022 </Link></li>
            <li><Link class="dropdown-item" to="/5Visualisointi">Vostok Ice Core Co2 417160-2342 </Link></li>
            <li><Link class="dropdown-item" to="/6Visualisointi">Antarctic Ice Cores Revised </Link></li>
            <li><Link class="dropdown-item" to="/7Visualisointi">Evolution of global temperature </Link></li>
            <li><Link class="dropdown-item" to="/8Visualisointi">CO2 emissions by country </Link></li>
            <li><Link class="dropdown-item" to="/9Visualisointi">CO2 emissions by sectors </Link></li>
          </ul>
        </li>
      </ul>
>>>>>>> Stashed changes
    </div>
  </nav>
  )
}

export default Navbar