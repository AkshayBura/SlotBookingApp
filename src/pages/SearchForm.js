import React, { useState, useEffect } from 'react';
import '../components/slot/HighlightedSlot.css';
import HighlightedSlot from '../components/slot/HighlightedSlot';
import '../components/slot/SlotForm.css';
import Card from '../components/UI/Card.js';
import BookSlotService from '../services/Book.Slot.Services';
import AddSlotService from '../services/Add.Slot.Services';
function SearchForm() {
    const [enteredDate, setDate] = useState("");
    const [enteredSlot, setSlot] = useState("");
    const [show, setShow] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [bookedSlot, setBookSlot] = useState([]);
    const [slotData, setSlotData] = useState([]);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [dropDown, setDropDown] = useState([]);

    useEffect(() => {
        fetchHandler();
    }, [])
    async function fetchHandler() {
        try {
            const data = await BookSlotService.getAllSlots();
            setBookSlot(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
        try {
            const data = await AddSlotService.getAllSlots();
            setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
    }
    async function submitFormHandler(event) {
        event.preventDefault();

        if (enteredDate === "") {
            setError1(true);
            return;
          }
          else {
            setError1(false);
          }
      
          if (enteredSlot === "") {
            setError2(true);
            return;
          }else if(enteredSlot === "empty"){
            setError2(true);
            setShow(false);
            return;
          }
          else {
            setError2(false);
          }

          setTaskData(bookedSlot.filter(check => (check.date === enteredDate && check.slot === enteredSlot)));
          if(taskData.length > 0){
            setShow(true);
          }
    }

    function dateHandler(event) {
        setDate(event.target.value);

    }
    function slotHandler(event) {
        setSlot(event.target.value);
    }

    function blurHandler1() {
        setError1(enteredDate === "" ? true : false);
        const filtered = slotData.filter(check => (check.date === enteredDate));
        const array = [];
        for (const index in filtered) {
            array.push((filtered[index].from) + " - " + (filtered[index].to));
        }
        setDropDown(array);
    }
    function blurHandler2(e) {
        setError2(enteredSlot === "" ? true : false);
        setSlot(e.target.value);
    }
    let isDateValid = error1?'control invalid':'control';
    let isSlotValid = error2?'control invalid':'control';
    return (
        <>
            <Card>
                <form onSubmit={submitFormHandler} className='form'>



                    <div className={isDateValid}>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' placeholder="Enter Date" onChange={dateHandler} onBlur={blurHandler1} />
                        {error1 && <p className="error-text">Input is Invalid</p>}
                    </div>



                    <div className="input-group">
                        <div className={isSlotValid}>
                            <label htmlFor='slot'>Time Slot</label>
                            <select onChange={slotHandler} onBlur={blurHandler2}>
                                <option disabled>Select your Slot</option>
                                {dropDown.length > 0 ? dropDown.map((data) => {
                                    return <option value={data}>{data}</option>
                                }) : <option value="empty">No Slots</option>
                                }
                            </select>
                            {error2 && <p className="error-text">Input is Invalid</p>}
                        </div>
                    </div>


                    <div className='actions'>
                        <button className='btn' >Search</button>
                    </div>

                </form>
            </Card>


            {show && taskData.map((data)=>{
                return <HighlightedSlot name={data.name} lecture={data.lecture} date={data.date} slot={data.slot} link={data.link} />
            })
            }
        </>

    );
}
export default SearchForm;