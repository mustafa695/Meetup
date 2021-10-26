import React from 'react';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Create Meeting
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Logout
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Profile
            </a>
          </li>
        </ul>

          </div>
      </nav>
    </>
  );
};

export default Header;
