import { Fragment } from 'react';

import SlotItem from './SlotItem';
import './DateList.css';

function  SlotList (props)  {
  return (
    <Fragment>
      <ul className='list'>
      {props.slots.map((data) => (
          <SlotItem
            key={Math.random()}
            slots={data.slot}
            date={props.date}
            full={data.full}
          />
          ))} 
      </ul>
    </Fragment>
  );
};

export default SlotList;
