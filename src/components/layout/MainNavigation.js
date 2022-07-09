import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation  () {
  return (
    <header className='header'>
      <NavLink to='/' style={{textDecoration: 'none'}}><div className='logo'>Slot Booking</div></NavLink>
      <nav className='nav'>
        <ul>
        <li>
            <NavLink to='/search-slot' activeClassName='active'>
              Search Slot
            </NavLink>
          </li>
          <li>
            <NavLink to='/datelist' activeClassName='active'>
              All Slots
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-slot' activeClassName='active'>
              Book a Slot
            </NavLink>
            </li>
            <li>
            <NavLink to='/add-slot' activeClassName='active'>
              Add a Slot
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
