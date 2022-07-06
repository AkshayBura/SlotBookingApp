import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    fetch("https://react-day3-334ad-default-rtdb.firebaseio.com/users.json",{
      method: "POST",
      body: JSON.stringify(quoteData),
      header: {
        "Content-Type": "application-json"
      }
    });
    console.log(quoteData);
    
    history.push('/quotes');
  };

  return <QuoteForm onSave={addQuoteHandler} />;
};

export default NewQuote;
