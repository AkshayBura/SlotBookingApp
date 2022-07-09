import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const slotRef = collection(db,"Book_Slot");

class BookSlotService {
    addSlot = (newSlot) => {
        return addDoc(slotRef,newSlot);
    }

    getAllSlots = ()=>{
        return getDocs(slotRef);
    }
    
    updateSlot = (id, updatedSlot) =>{
        const slotDoc = doc(db, 'Book_Slot', id);
        return updateDoc(slotDoc,updatedSlot);
    }

    deleteSLot = (id) =>{
        const slotDoc = doc(db,'Book_Slot',id);
        return deleteDoc(slotDoc);
    }
}

export default new BookSlotService(); 