import React, { useState, useEffect } from 'react';
import AddSlotService from '../services/Add.Slot.Services';
import '../components/slot/SlotForm.css';
import Table from '../components/table/Table';
import classes from "../components/UI/Card.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddSlot(props) {

    const [enteredDate, setDate] = useState("");
    const [enteredSlot, setSlot] = useState(true);
    const [enteredStartTime, setStartTime] = useState("");
    const [enteredEndTime, setEndTime] = useState("");
    const [enteredLink, setLink] = useState("");
    const [enteredDate1, setDate1] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [showData, setShowData] = useState([]);
    const [data, setData] = useState([]);

    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    const [error6, setError6] = useState(false);
    const [slotData, setSlotData] = useState([]);
    useEffect(() => {
        fetchHandler();
    },[])
    const fetchHandler = async() => {
        try {
            const data = await AddSlotService.getAllSlots();
            setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
    }


    async function deleteSlotHandler(id) {
        await AddSlotService.deleteSLot(id);
        notify({ status: "success", showMessage: "Slot Deleted" });
    }

    async function submitFormHandler(event) {
        event.preventDefault();
        const data = await AddSlotService.getAllSlots();
        setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        if (enteredDate === "") {
            setError1(true);
            return;
        }
        else {
            setError1(false);
        }

        if (enteredStartTime === "") {
            setError2(true);
            return;
        }
        else {
            setError2(false);
        }

        if (enteredEndTime === "") {
            setError3(true);
            return;
        }
        else {
            setError3(false);
        }

        if (enteredLink === "") {
            setError4(true);
            return;
        }
        else {
            setError4(false);
        }
        if (enteredSlot === "") {
            setError5(true);
            return;
        }
        else {
            setError5(false);
        }


        const filtered = slotData.filter(check => (check.date === enteredDate));

        if (filtered.length > 0) {

            for (const index in filtered) {
                let from = (filtered[index].from).split(':');
                let to = (filtered[index].to).split(':');
                let enteredFrom = (enteredStartTime).split(':');
                let enteredTo = (enteredEndTime).split(':');
                from = (parseFloat(from[0]) + parseFloat(from[1] / 100));
                to = (parseFloat(to[0]) + parseFloat(to[1] / 100));
                enteredFrom = (parseFloat(enteredFrom[0]) + parseFloat(enteredFrom[1] / 100));
                enteredTo = (parseFloat(enteredTo[0]) + parseFloat(enteredTo[1] / 100));

                if ((enteredFrom >= from) && (enteredFrom <= to)) {
                    notify({ status: "fail", showMessage: "Time Slot Overlap" });
                    return;
                }
                else if ((enteredTo > from) && (enteredTo < to)) {
                    notify({ status: "fail", showMessage: "Time Slot Overlap" });
                    return;
                }
                else if ((enteredFrom < from) && (enteredTo > to)) {
                    notify({ status: "fail", showMessage: "Time Slot Overlap" });
                    return;
                }
            }
        }

        const newSlot = {
            available: enteredSlot,
            date: enteredDate,
            from: enteredStartTime,
            slot: parseInt(enteredLink),
            to: enteredEndTime
        };

        try {
            await AddSlotService.addSlot(newSlot);
            setDate("");
            setSlot("");
            setStartTime("");
            setEndTime("");
            setLink("");
            notify({ status: "success", showMessage: "Slot Added Successfully" });
            
        }
        catch (err) {
            notify({ status: "fail", showMessage: err.message });
        }
    }
    function searchFormHandler(e) {
        e.preventDefault();
        if (enteredDate1 === "") {
            setError6(true);
            return;
        }
        else {
            setError6(false);
        }

        if (showData.length > 0) {
            setShowTable(true);
        } else {
            setShowTable(false);
            setError6(true);
        }
        setData(showData);


    }

    function dateHandler(event) {
        setDate(event.target.value);
        if (enteredDate.trim() !== "") {
            setError1(false);
        }
    }
    function dateHandler1(event) {
        setDate1(event.target.value);
        if (enteredDate1.trim() !== "") {
            setError6(false);
        }
    }
    function startTimeHandler(event) {
        setStartTime(event.target.value);
        if (enteredStartTime.trim() !== "") {
            setError2(false);
        }
    }
    function endTimeHandler(event) {
        setEndTime(event.target.value);
        if (enteredEndTime.trim() !== "") {
            setError3(false);
        }
    }
    function linkHandler(event) {
        setLink(event.target.value);
        if (enteredLink.trim() !== "") {
            setError4(false);
        }
    }
    function slotHandler(event) {
        setSlot(event.target.value ? true : false);
        if (enteredSlot !== "") {
            setError5(false);
        }
    }

    function blurHandler1() {
        setError1(enteredDate === "" ? true : false);
    }
    function blurHandler2() {
        setError2(enteredStartTime === "" ? true : false);
    }
    function blurHandler3() {
        setError3(enteredEndTime === "" ? true : false);
    }
    function blurHandler4() {
        setError4(enteredLink === "" ? true : false);
    }
    function blurHandler5() {
        setError5(enteredSlot === "" ? true : false);
    }
    function blurHandler6(event) {
        setDate1(event.target.value);
        setError6(enteredDate1 === "" ? true : false);
        setShowData(slotData.filter(check => (check.date === enteredDate1)));

    }
    const notify = (message) => {
        if (message.status === "success") {
            toast.success(message.showMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchHandler();
        } else {
            toast.error(message.showMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchHandler();
        }
    }

    let isDateValid = error1 ? 'control invalid' : 'control';
    let isStartTimeValid = error2 ? 'control invalid' : 'control';
    let isEndTimeValid = error3 ? 'control invalid' : 'control';
    let isLinkValid = error4 ? 'control invalid' : 'control';
    let isSlotValid = error5 ? 'control invalid' : 'control';
    let isDateValid1 = error1 ? 'control invalid' : 'control';

    return (
        <>

            <div className={classes.newCard}>
                <form onSubmit={submitFormHandler} className='form'>



                    <div className={isDateValid}>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' placeholder="Enter Date" onChange={dateHandler} onBlur={blurHandler1} value={enteredDate}/>
                        {error1 && <p className="error-text">Input is Invalid</p>}
                    </div>

                    <div className={isStartTimeValid}>
                        <label htmlFor='date'>Start Time</label>
                        <input type='time' id='start-time' onChange={startTimeHandler} onBlur={blurHandler2} value={enteredStartTime} />
                        {error2 && <p className="error-text">Input is Invalid</p>}
                    </div>

                    <div className={isEndTimeValid}>
                        <label htmlFor='date'>End Time</label>
                        <input type='time' id='end-time' onChange={endTimeHandler} onBlur={blurHandler3} value={enteredEndTime} />
                        {error3 && <p className="error-text">Input is Invalid</p>}
                    </div>

                    <div className={isLinkValid}>
                        <label htmlFor='author'>Link Slot</label>
                        <input type='number' id='link' placeholder="Total Link Slots" onChange={linkHandler} onBlur={blurHandler4} value={enteredLink} />
                        {error4 && <p className="error-text">Input is Invalid</p>}
                    </div>
                    <div className="input-group">
                        <div className={isSlotValid}>
                            <label htmlFor='slot'>Availability?</label>
                            <select onChange={slotHandler} onBlur={blurHandler5}>
                                <option disabled hidden>Select Availability</option>
                                <option value="true">True</option>
                                <option value="false">False</option>

                            </select>
                            {error5 && <p className="error-text">Input is Invalid</p>}
                        </div>
                    </div>
                    <div className='actions'>
                        <button className='btn' >Add Slot</button>
                    </div>

                </form>

            </div>
            <div className={classes.newCard}>
                <form className='form' onSubmit={searchFormHandler}>
                    <div className={isDateValid1}>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' placeholder="Enter Date" onChange={dateHandler1} onBlur={blurHandler6} />
                        {error6 && <p className="error-text">Input is Invalid</p>}
                    </div>
                    <div className='actions'>
                        <button className='btn' >Search</button>

                    </div>
                </form>
            </div>
            {showTable && <Table data={data} deleteHandler={deleteSlotHandler}/>}
            <ToastContainer />
        </>
    );
};

export default AddSlot;