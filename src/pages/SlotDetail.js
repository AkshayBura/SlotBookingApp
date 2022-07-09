import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookSlotService from '../services/Book.Slot.Services';
import HighlightedSlot from '../components/slot/HighlightedSlot';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const SlotDetail = () => {
  const params = useParams();
  const [slotData, setSlotData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {
    fetchHandler();
}, [taskData])
async function fetchHandler() {
  setLoad(taskData.length>0?false:true);
    try {
        const data = await BookSlotService.getAllSlots();
        setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
        console.log(err);
    }
    setTaskData(slotData.filter(check => (check.date === params.dateId && check.slot === params.slotId)));
    
}


  return (<>
    {isLoad && (
      <form className='form'>
    <div className='loading'>
      <LoadingSpinner />
    </div>
    </form>
  )}
    <Fragment>
      {taskData.map((data)=>(
        <HighlightedSlot name={data.name} lecture={data.lecture} date={data.date} slot={data.slot} link={data.link} />
      ))}

      {/* <Route path={`/datelist/${params.quoteId}/comments`}>
        <Comments />
      </Route> */}
    </Fragment>
    </>
  );
};

export default SlotDetail;
