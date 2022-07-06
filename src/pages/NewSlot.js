import { useHistory } from 'react-router-dom';

import SlotForm from '../components/slot/SlotForm';

const NewSlot = () => {
  const history = useHistory();

  function saveHandler(inputData){
    console.log("inside");
    fetch("https://react-day3-334ad-default-rtdb.firebaseio.com/users.json",{
        method: "POST",
        body: JSON.stringify(inputData),
        header: {
          "Content-Type": "application-json"
        }
      });
    
    history.push('/datelist');
  };

  return <SlotForm onSave={saveHandler} />;
};

export default NewSlot;
