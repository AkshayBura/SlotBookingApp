import SlotList from "../components/slot/Slotlist";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
// const slot=[];

function Slots(){
    useEffect(()=>{
        fetchHandler();
      });
    const params = useParams();
    const [taskData, setTaskData] = useState([]);
    const [fullSLot1, setSlot1] = useState();
    const [fullSLot2, setSlot2] = useState();
    const [fullSLot3, setSlot3] = useState();
    const [fullSLot4, setSlot4] = useState();
    
    async function fetchHandler(){
        const response = await fetch("https://react-day3-334ad-default-rtdb.firebaseio.com/users.json");
        const data = await response.json();
        const loadedData = [];
        for(const key in data){
          loadedData.push(data[key]);
        }
        const slot1 = loadedData.filter(check => (check.slot === "Slot1" && check.date === params.dateId)) ;
        const slot2 = loadedData.filter(check => (check.slot === "Slot2" && check.date === params.dateId));
        const slot3 = loadedData.filter(check => (check.slot === "Slot3" && check.date === params.dateId));
        const slot4 = loadedData.filter(check => (check.slot === "Slot4" && check.date === params.dateId));  
        const slot1Size = slot1.length===4?true:false;
        setSlot1(slot1Size);
        setSlot2(slot2.length===4?true:false);
        setSlot3(slot3.length===4?true:false);
        setSlot4(slot4.length===4?true:false);
        setTaskData([
            {
                slot: "Slot1",
                full: fullSLot1
            },
            {
                slot: "Slot2",
                full: fullSLot2
            },
            {
                slot: "Slot3", 
                full: fullSLot3
            },
            {
                slot: "Slot4",
                full: fullSLot4
            }
        ]
        );
      }    
      
    // filterHandler();
    return(
        <SlotList date={params.dateId} slots={taskData}/>
    );
    
}

export default Slots;