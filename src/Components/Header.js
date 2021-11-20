import React from 'react';
import { useHistory } from 'react-router';

const Header = () => {
  let history = useHistory();
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <div className="container">
        <ul className="navbar-nav mx-auto">
        <li className="nav-item" onClick={() => history.push('/dashboard')}>
            <a className="nav-link" href="">
              Dashboard
            </a>
          </li>
          <li className="nav-item" onClick={() => history.push('/accept-meetup')}>
            <a className="nav-link" href="">
              Your Requests
            </a>
          </li>
          <li className="nav-item" onClick={() => history.push('/request-accepeted')}>
            <a className="nav-link" href="">
              Meetings Accept
            </a>
          </li>
          <li className="nav-item" onClick={() => history.push('/reject-meetup')}>
            <a className="nav-link" href="">
              Reject Requests
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
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
