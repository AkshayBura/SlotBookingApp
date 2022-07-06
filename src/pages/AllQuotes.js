import React, { useState, useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [];

const AllQuotes = () => {
  const [taskData, setTaskData] = useState(DUMMY_QUOTES);
  useEffect(()=>{
    fetchHandler();
  },[]);
  async function fetchHandler(){
    const response = await fetch("https://react-day3-334ad-default-rtdb.firebaseio.com/users.json");
    const data = await response.json();
    console.log(data);
    const loadedData = [];
    for(const key in data){
      loadedData.push(data[key]);
    }
    setTaskData(loadedData);
  }
  return <QuoteList quotes={taskData} />
};

export default AllQuotes;