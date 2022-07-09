import { db } from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const slotRef = collection(db,"Add_Slot");

class AddSlotService {
    addSlot = (newSlot) => {
        return addDoc(slotRef,newSlot);
    }

    getAllSlots = ()=>{
        return getDocs(slotRef);
    }
    
    updateSlot = (id, updatedSlot) =>{
        const slotDoc = doc(db, 'Add_Slot', id);
        return updateDoc(slotDoc,updatedSlot);
    }

    deleteSLot = (id) =>{
        const slotDoc = doc(db,'Add_Slot',id);
        return deleteDoc(slotDoc);
    }

    getSlot = (id) =>{
        const slotDoc = doc(db,'Add_Slot',id);
        return getDoc(slotDoc);
    }
}

export default new AddSlotService(); 