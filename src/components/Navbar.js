import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
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
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar