import React, { useState, useEffect } from 'react';
import DateList from '../components/slot/DateList';
import AddSlotService from '../services/Add.Slot.Services';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const AllDates = () => {
  const [slotData, setSlotData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {
    fetchHandler();
  }, [taskData])
  async function fetchHandler() {
    setLoad(taskData.length>0?false:true);
    try {
      const data = await AddSlotService.getAllSlots();
      setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
    setTaskData(getUnique(slotData, 'date'));
    
  }
  function getUnique(arr, comp) {
    
    const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
  return (<>
    {isLoad && (
      <form className='form'>
        <div className='loading'>
          <LoadingSpinner />
        </div>
      </form>
    )}<DateList dates={taskData} key={Math.random()} />
  </>
  );
};

export default AllDates;