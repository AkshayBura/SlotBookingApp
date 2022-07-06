import { Fragment } from 'react';

import DateItem from './DateItem';
import './DateList.css';

function  DateList (props)  {
  return (
    <Fragment>
      <ul className='list'>
        {props.quotes.map((quote) => (
          <DateItem
            key={quote.id}
            id={quote.id}
            author={quote.name}
            date={quote.date}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default DateList;
