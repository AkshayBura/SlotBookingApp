import { Fragment } from 'react';

import QuoteItem from './QuoteItem';
import './QuoteList.css';

function  QuoteList (props)  {
  return (
    <Fragment>
      <ul className='list'>
        {props.quotes.map((quote) => (
          <QuoteItem
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

export default QuoteList;
