import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import './QuoteForm.css';

function QuoteForm  (props)  {
    const[enteredName, setName] = useState("");
    const[enteredLecture, setLecture] = useState("");
    const[enteredDate, setDate] = useState("");
    const[enteredSlot, setSlot] = useState("");
    const[enteredLink, setLink] = useState("");

    const[error1, setError1] = useState(false);
    const[error2, setError2] = useState(false);
    const[error3, setError3] = useState(false);
    const[error4, setError4] = useState(false);
    const[error5, setError5] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    if(enteredName === ""){
      setError1(true);
      return;
    }
    else{
      setError1(false);
    }

    if(enteredLecture === ""){
      setError2(true);
      return;
    }
    else{
      setError2(false);
    }

    if(enteredDate === ""){
      setError3(true);
      return;
    }
    else{
      setError3(false);
    }

    if(enteredSlot === ""){
      setError4(true);
      return;
    }
    else{
      setError4(false);
    }

    if(enteredLink === ""){
      setError5(true);
      return;
    }
    else{
      setError5(false);
    }
  
    // console.log(event);
    // console.log(enteredSlot);

    const userData = {
      name: enteredName,
      lecture: enteredLecture,
      date: enteredDate,
      slot: enteredSlot,
      link: enteredLink
  };
  console.log(userData);
  props.onSave(userData);

  //   console.log(userData);
  }

  function nameHandler(event){
    setName(event.target.value);
    if(enteredName.trim() !== ""){
      setError1(false);
    }
  }
  function lectureHandler(event){
    setLecture(event.target.value);
    if(enteredLecture.trim() !== ""){
      setError2(false);
    }
  }
  function dateHandler(event){
    setDate(event.target.value);
    if(enteredDate.trim() !== ""){
      setError3(false);
    }
  }
  function slotHandler(event){
    setSlot(event.target.value);
    if(enteredSlot.trim() !== ""){
      setError4(false);
    }
  }
  function linkHandler(event){
    setLink(event.target.value);
    if(enteredLink.trim() !== ""){
      setError5(false);
    }
  }

  function blurHandler(){
    if(enteredName === ""){
      setError1(true);
      return;
      
    }
    else{
      setError1(false);
    }

    if(enteredLecture === ""){
      setError2(true);
      return;
    }
    else{
      setError2(false);
    }

    if(enteredDate === ""){
      setError3(true);
      return;
    }
    else{
      setError3(false);
    }

    if(enteredSlot === ""){
      setError4(true);
      return;
    }
    else{
      setError4(false);
    }

    if(enteredLink === ""){
      setError5(true);
      return;
    }
    else{ 
      setError5(false);
    }
  }
  
  let isNameValid = error1?'control invalid':'control';
  let isLectureValid = error2?'control invalid':'control';
  let isDateValid = error3?'control invalid':'control';
  let isSlotValid = error4?'control invalid':'control';
  let isLinkValid = error5?'control invalid':'control';

  return (
    <Card>
      
      <form onSubmit={submitFormHandler} className='form'>
        {props.isLoading && (
          <div className='loading'>
            <LoadingSpinner />
          </div>
        )}

        <div className={isNameValid}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' placeholder="Enter Name" onChange={nameHandler} onBlur={blurHandler}/>
          {error1 && <p className="error-text">Input is Invalid</p>}
        </div>
        <div className={isLectureValid}>
          <label htmlFor='lecture'>Lecture Name</label>
          <input type='text' id='lecture' placeholder="Enter Lecture Name" onChange={lectureHandler} onBlur={blurHandler}/>
          {error2 && <p className="error-text">Input is Invalid</p>}
        </div>
        <div className={isDateValid}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' placeholder="Enter Date" onChange={dateHandler} onBlur={blurHandler}/>
          {error3 && <p className="error-text">Input is Invalid</p>}
        </div>

        <div class="input-group">
        <div className={isSlotValid}>
          <label htmlFor='slot'>Slot</label>
          <select onChange={slotHandler} onBlur={blurHandler}>
            <option selected disabled hidden>Select your Slot</option>
            <option value="Slot1">Slot1</option>
            <option value="Slot2">Slot2</option>
            <option value="Slot3">Slot3</option>
            <option value="Slot4">Slot4</option>
          </select>
          {error4 && <p className="error-text">Input is Invalid</p>}
        </div>
        </div>

        <div className={isLinkValid}>
          <label htmlFor='author'>Zoom ID</label>
          <input type='text' id='link' placeholder="Enter Zoom ID" onChange={linkHandler} onBlur={blurHandler}/>
          {error5 && <p className="error-text">Input is Invalid</p>}
        </div>

        <div className='actions'>
          <button className='btn' >Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
