import SlotList from "../components/slot/Slotlist";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookSlotService from "../services/Book.Slot.Services";
import AddSlotService from "../services/Add.Slot.Services";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// const slot=[];

function Slots() {
    const params = useParams();
    const [isLoad, setLoad] = useState(true);
    const [slotData, setSlotData] = useState([]);
    const [bookedSlot, setBookSlot] = useState([]);
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        fetchHandler();
    }, [taskData])
    async function fetchHandler() {
        try {
            const data = await AddSlotService.getAllSlots();
            setSlotData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
        try {
            const data = await BookSlotService.getAllSlots();
            setBookSlot(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
       
        // console.log(bookedSlot.filter(check=>(check.date === slots[0].date && check.slot === (slots[0].from + " - " +slots[0].to))).length);
        
        setTaskData(objectHandler());
        
    }
    function objectHandler(){
        const slots = slotData.filter(check => (check.date === params.dateId));
        const dataStatus = [];
         for(const key in slots) {
            dataStatus.push({
                slot: (slots[key].from + " - " + slots[key].to),
                full: (slots[key].slot === bookedSlot.filter(check=>(check.date === slots[key].date && check.slot === (slots[key].from + " - " +slots[key].to))).length?true:false)
            })
        } 
        setLoad(dataStatus.length>0?false:true)
        return dataStatus;
    }

    // filterHandler();
    return (
        <>
        {isLoad && (
            <form className='form'>
          <div className='loading'>
            <LoadingSpinner />
          </div>
          </form>
        )}
        <SlotList date={params.dateId} slots={taskData} />
        </>
    );

}

export default Slots;