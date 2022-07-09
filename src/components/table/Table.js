import '../../components/layout/MainNavigation.css';
import './Table.css';
import classes from '../UI/Card.module.css';

function Table(props) {

    return (
        <div className={classes.newCard}>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>No. Slots</th>
                    <th>Status</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map((value) => {
                    return (
                        <tr key={Math.random()}>
                            <td>{value.date}</td>
                            <td>{value.from}</td>
                            <td>{value.to}</td>
                            <td>{value.slot}</td>
                            <td>{String(value.available)}</td>
                            <td>
                                <button className='btn-danger btn1' onClick={ (e) => props.deleteHandler(value.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;