import { Link } from 'react-router-dom';

import './DateItem.css';

//const QuoteItem = (props) => {
  function DateItem  (props)  {
return (
    <li className='item'>
      <figure>
        <blockquote>
          <p>{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(props.date))}</p>
        </blockquote>
        {/* <figcaption>{props.author}</figcaption> */}
      </figure>
      <Link className='btn' to={`/datelist/${props.date}`}>
        View Slots
      </Link>
    </li>
  );
};

export default DateItem;
