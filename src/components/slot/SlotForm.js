import React, { useState, useEffect } from 'react';
import AddSlotService from '../../services/Add.Slot.Services';
import BookSlotService from '../../services/Book.Slot.Services';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './SlotForm.css';
import { useHistory } from 'react-router-dom';

function SlotForm(props) {
  const history = useHistory();
  const [enteredName, setName] = useState("");
  const [enteredLecture, setLecture] = useState("");
  const [enteredDate, setDate] = useState("");
  const [enteredSlot, setSlot] = useState("");
  const [enteredLink, setLink] = useState("");

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [isAllowed, setAllowed] = useState(true);
  const [slotData, setSlotData] = useState([]);
  const [bookedSlot, setBookSlot] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  useEffect(() => {
    fetchHandler();
  }, [])
  const fetchHandler = async () => {
    try {
      const data = await AddSlotService.getAllSlots();
      setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      // console.log(err);
    }
    try {
      const data = await BookSlotService.getAllSlots();
      setBookSlot(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      // console.log(err);
    }
  }
  async function submitFormHandler(event) {
    event.preventDefault();
    if (enteredName === "") {
      setError1(true);
      return;
    }
    else {
      setError1(false);
    }

    if (enteredLecture === "") {
      setError2(true);
      return;
    }
    else {
      setError2(false);
    }

    if (enteredDate === "") {
      setError3(true);
      return;
    }
    else {
      setError3(false);
    }

    if (enteredSlot === "") {
      setError4(true);
      return;
    } else if (enteredSlot === "empty") {

      setError4(true);
      return;
    }
    else {
      setError4(false);
    }

    if (enteredLink === "") {
      setError5(true);
      return;
    }
    else {
      setError5(false);
    }
    const slotSelected = enteredSlot.split(' - ');
    const status = bookedSlot.filter(check => (check.date === enteredDate && check.slot === enteredSlot));
    const dbEntry = slotData.filter(check => (check.date === enteredDate && check.from === slotSelected[0] && check.to === slotSelected[1]));
    if (status.length === dbEntry[0].slot) {
      // setAllowed(false);
      notify({ status: "fail", showMessage: "Slot is Full" });
      return;
    } else {
      setAllowed(true);
    }
    const userData = {
      name: enteredName,
      lecture: enteredLecture,
      date: enteredDate,
      slot: enteredSlot,
      link: enteredLink,
    };

    try {
      await BookSlotService.addSlot(userData);
      setName("");
      setLecture("");
      setDate("");
      setSlot("");
      setLink("");
      setDropDown("");
      notify({ status: "success", showMessage: "Booked Slot Successfully" });
    }
    catch (err) {
      // console.log(err);
    }
  }

  function nameHandler(event) {
    setName(event.target.value);
    if (enteredName.trim() !== "") {
      setError1(false);
    }
  }
  function lectureHandler(event) {
    setLecture(event.target.value);
    if (enteredLecture.trim() !== "") {
      setError2(false);
    }
  }
  function dateHandler(event) {
    setDate(event.target.value);
    if (enteredDate.trim() !== "") {
      setError3(false);
    }
  }
  function slotHandler(event) {
    setSlot(event.target.value);
  }
  function linkHandler(event) {
    setLink(event.target.value);
    if (enteredLink.trim() !== "") {
      setError5(false);
    }
  }

  function blurHandler1() {
    setError1(enteredName === "" ? true : false);
  }
  function blurHandler2() {
    setError2(enteredLecture === "" ? true : false);
  }
  function blurHandler3() {
    setError3(enteredDate === "" ? true : false);
    const filtered = slotData.filter(check => (check.date === enteredDate && check.available === true));
    const array = [];
    for (const index in filtered) {
      array.push((filtered[index].from) + " - " + (filtered[index].to));
    }
    setDropDown(array);
  }
  function blurHandler4(e) {
    setError4(enteredSlot === "" ? true : false);
    setSlot(e.target.value);
  }
  function blurHandler5() {
    setError5(enteredLink === "" ? true : false);
  }

  let isNameValid = error1 ? 'control invalid' : 'control';
  let isLectureValid = error2 ? 'control invalid' : 'control';
  let isDateValid = error3 ? 'control invalid' : 'control';
  let isSlotValid = error4 ? 'control invalid' : 'control';
  let isLinkValid = error5 ? 'control invalid' : 'control';
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
      history.push("/new-slot");
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
      history.push("/new-slot");
    }
  }
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
          <input type='text' id='name' placeholder="Enter Name" onChange={nameHandler} onBlur={blurHandler1} value={enteredName} />
          {error1 && <p className="error-text">Input is Invalid</p>}
        </div>
        <div className={isLectureValid}>
          <label htmlFor='lecture'>Lecture Name</label>
          <input type='text' id='lecture' placeholder="Enter Lecture Name" onChange={lectureHandler} onBlur={blurHandler2} value={enteredLecture} />
          {error2 && <p className="error-text">Input is Invalid</p>}
        </div>
        <div className={isDateValid}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' placeholder="Enter Date" onChange={dateHandler} onBlur={blurHandler3} value={enteredDate} />
          {error3 && <p className="error-text">Input is Invalid</p>}
        </div>

        <div className="input-group">
          <div className={isSlotValid}>
            <label htmlFor='slot'>Slot</label>
            <select onChange={slotHandler} onBlur={blurHandler4}>
              <option disabled>Select your Slot</option>
              {dropDown.length > 0 ? dropDown.map((data) => {
                return <option value={data}>{data}</option>
              }) : <option value="empty">No Slots</option>
              }
            </select>
            {error4 && <p className="error-text">Input is Invalid</p>}
          </div>
        </div>

        <div className={isLinkValid}>
          <label htmlFor='author'>Zoom ID</label>
          <input type='text' id='link' placeholder="Enter Zoom ID" onChange={linkHandler} onBlur={blurHandler5} value={enteredLink} />
          {error5 && <p className="error-text">Input is Invalid</p>}
        </div>

        <div className='actions'>
          <button className='btn' >Add Slot</button>
        </div>
        {!isAllowed && <p className="error-text">Slot is Full</p>}
      </form>
      <ToastContainer />
    </Card>
  );
};

export default SlotForm;