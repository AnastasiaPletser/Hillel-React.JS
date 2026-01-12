import React from 'react'

function NavItem({ nav }) {
  return (
    <li className='nav-item' key={nav._id}>
        <a className="nav-link collapsed" href="#">
            <span>{nav.name}</span>
        </a>
    </li>
  );
}

export default NavItem
