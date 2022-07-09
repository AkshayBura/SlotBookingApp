import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './DateItem.css';


  function SlotItem  (props)  {
    const [isFull, setisFull] = useState(false);
    useEffect(()=>{
        notifyHandler();
    }
    )
    function notifyHandler(){
        setisFull(props.full)
    }
return (
    <li className='item' style={{backgroundColor: isFull && "#ffb0b0"}}>
      <figure>
        <blockquote>
          <p>{props.slots}</p>
        </blockquote>
        <figcaption>{isFull?"Slots Full":"Slots Available"}</figcaption>
      </figure>
      <Link className='btn' to={`/slot/${props.date}/${props.slots}`}>
        View Details
      </Link>
    </li>
  );
};

export default SlotItem;
