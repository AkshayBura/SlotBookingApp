import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import HighlightedSlot from '../components/slot/HighlightedSlot';
// import Comments from '../components/comments/Comments';

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'author-1', text: 'Learning React is fun!' },
//   { id: 'q2', author: 'author-2', text: 'Learning React is great!' },
// ];

const SlotDetail = () => {
  useEffect(()=>{
    fetchHandler();
  },[])
  const params = useParams();
  const [slotData, setSlotData] = useState([]);

console.log(params.dateId,params.slotId);
async function fetchHandler(){
  const response = await fetch("https://apptocheckavailableslots-default-rtdb.firebaseio.com/users.json");
  const data = await response.json();
  const loadedData = [];
  for(const key in data){
    loadedData.push(data[key]);
  }
  const slot = loadedData.filter(check => (check.slot === params.slotId && check.date === params.dateId)) ;
  setSlotData(slot);

}

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  // if (!quote) {
  //   return <p>No quote found!</p>;
  // }

  return (
    <Fragment>
      {slotData.map((data)=>(
        <HighlightedSlot name={data.name} lecture={data.lecture} date={data.date} slot={data.slot} link={data.link} />
      ))}

      {/* <Route path={`/datelist/${params.quoteId}/comments`}>
        <Comments />
      </Route> */}
    </Fragment>
  );
};

export default SlotDetail;
