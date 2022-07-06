import { Link } from 'react-router-dom';

import './QuoteItem.css';

//const QuoteItem = (props) => {
  function QuoteItem  (props)  {
return (
    <li className='item'>
      <figure>
        <blockquote>
          <p>{props.date}</p>
        </blockquote>
        {/* <figcaption>{props.author}</figcaption> */}
      </figure>
      <Link className='btn' to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
