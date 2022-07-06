import React, { useState, useEffect } from 'react';
import DateList from '../components/slot/DateList';

const DUMMY_DATES = [];

const AllDates = () => {
  const [taskData, setTaskData] = useState(DUMMY_DATES);
  useEffect(()=>{
    fetchHandler();
  },[]);
  function getUnique(arr,comp){
    const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e)=== i && i).filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
  async function fetchHandler(){
    const response = await fetch("https://apptocheckavailableslots-default-rtdb.firebaseio.com/users.json");
    const data = await response.json();
    // console.log(data);
    const loadedData = [];
    for(const key in data){
      loadedData.push(data[key]);
    }
    setTaskData(getUnique(loadedData, "date"));
  }
  return <DateList quotes={taskData} key={Math.random()} />
};

export default AllDates;