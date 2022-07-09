import './HighlightedSlot.css';

const HighlightedSlot = (props) => {
  return (

    <div className='quote'>
      <p className='date'>{new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(props.date))}</p>
      <div><span id='time'>Time:</span> {props.slot}</div>
      <div><span id='prof-name'>Prof Name:</span> {props.name}</div>
      <div><span id='lec'>Lecture:</span> {props.lecture}</div>
      <div><span id='lec-link'>Lecture Link:</span> {props.link}</div>
    </div>
  );
};

export default HighlightedSlot;