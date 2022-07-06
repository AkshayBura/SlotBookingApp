import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation  () {
  return (
    <header className='header'>
      <div className='logo'>Great Quotes</div>
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/datelist' activeClassName='active'>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-slot' activeClassName='active'>
              Add a Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
