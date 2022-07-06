import classes from './NoQuotesFound.css';

const NoQuotesFound = () => {
  return (
    <div className='noquotes'>
      <p>No quotes found!</p>
      <a className='btn'>
        Add a Quote
      </a>
    </div>
  );
};

export default NoQuotesFound;
