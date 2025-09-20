import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingForm(props) {
    const [date, setDate] = useState("");
    const [times, setTimes] = useState("");
    const [guests, setGuests] = useState("");
    const [occasion, setOccasion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (date && props.fetchTimes) {
            props.fetchTimes(date);
        }
    }, [date, props]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.SubmitForm({ date, times, guests, occasion });
        navigate('/confirmed'); 
    }

    const handleChange = (e) => {
        setDate(e);
        props.dispatch(e);
    }

    // const timesArray = props.availableTimes || [];

    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>

                        {/* Date */}
                        <div>
                            <label htmlFor="book-date">Choose date</label>
                            <input 
                            id="book-date" 
                            type="date" 
                            required
                            name="book-date" 
                            value={date}
                            onChange={e => handleChange(e.target.value)}/>
                        </div>

                        {/* Time */}
                        <div>
                            <label htmlFor="book-time">Choose time:</label>
                            <select 
                                id="book-time" 
                                required
                                value={times} 
                                onChange={(e) => setTimes(e.target.value)}>
                            <option value="">Select a time</option>
                            {
                            props.availableTimes.availableTimes.length > 0 ? (props.availableTimes.availableTimes.map(time => (<option key={time} value={time}>{time}</option>))
                            ) : (
                            <option disabled>No times available</option>
                            )
                            }
                            </select>
                        </div>
                
                        {/* Number of guests */}
                        <div>
                            <label htmlFor="book-guests">Number of guests:</label>
                            <input 
                            id='book-guests' 
                            min='1' 
                            value={guests} 
                            max='10'
                            type='number'
                            required
                            onChange={(e) => setGuests(e.target.value)}/>
                        </div>

                        {/* Occasion */}
                        <div>
                            <label htmlFor="book-occasion">Occasion:</label>
                            <select 
                                id="book-occasion" 
                                key={occasion}
                                value={occasion} 
                                required
                                onChange={(e) => setOccasion(e.target.value)}>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                        </div>

                        {/* Submit button */}
                        <button className='btn' type='submit' aria-label='Book your Reservation'> Make your reservation </button>
                    </fieldset>
                </form>
            </section>
        </header>
    )    
}

export default BookingForm;