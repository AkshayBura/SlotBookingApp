import './HighlightedQuote.css';

const HighlightedQuote = (props) => {
  return (
    <div className='quote'>
      <p>{props.text}</p>
      <div>{props.author}</div>
    </div>
  );
};

export default HighlightedQuote;
