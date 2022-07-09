import { Fragment } from 'react';

import DateItem from './DateItem';
import './DateList.css';

function  DateList (props)  {
  return (
    <Fragment>
      <ul className='list'>
        {props.dates.map((data) => (
          <DateItem
            key={Math.random()}
            date={data.date}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default DateList;
