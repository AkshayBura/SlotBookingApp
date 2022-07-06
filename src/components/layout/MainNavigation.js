import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation  () {
  return (
    <header className='header'>
      <div className='logo'>Slots</div>
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/datelist' activeClassName='active'>
              All Slots
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-slot' activeClassName='active'>
              Add a Slot
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
