import './HighlightedSlot.css';

const HighlightedSlot = (props) => {
  return (
    <div className='quote'>
      <p>{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(props.date))}</p>
      <div>{props.slot}</div>
      <div>{props.name}</div>
      <div>{props.lecture}</div>
      <div>{props.link}</div>
    </div>
  );
};

export default HighlightedSlot;
