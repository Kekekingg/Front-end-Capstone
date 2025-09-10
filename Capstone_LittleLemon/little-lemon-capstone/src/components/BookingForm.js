import React from 'react';

function BookingForm(props) {
    const [date, setDate] = React.useState("");
    const [times, setTimes] = React.useState("");
    const [guests, setGuests] = React.useState("");
    const [occasion, setOccasion] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.SubmitForm(e);
    }

    const handleChange = (e) => {
        setDate(e);
        props.dispatch(e);
    }

    const timesArray = props.availableTimes || [];

    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>

                        {/* Date */}
                        <div>
                            <label htmlFor="book-date">Choose date</label>
                            <input 
                            type="date" 
                            required
                            id="book-date" 
                            name="book-date" 
                            value={date}
                            onChange={(e) => handleChange(e.target.value)}/>
                        </div>

                        {/* Time */}
                        <div>
                            <label htmlFor="book-time">Choose time:</label>
                            <select 
                                id="book-time" 
                                value={times} 
                                onChange={(e) => setTimes(e.target.value)}>
                            <option value="">Select a time</option>
                            {
                                timesArray.length > 0 ? (timesArray.map((time) => (<option key={time}>{time}</option>))
                                ) : (
                                <option disabled>No times available</option>)
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
                            onChange={(e) => setGuests(e.target.value)}/>
                        </div>

                        {/* Occasion */}
                        <div>
                            <label htmlFor="book-occasion">Occasion:</label>
                            <select 
                                id="book-occasion" 
                                key={occasion}
                                value={occasion} 
                                onChange={(e) => setOccasion(e.target.value)}>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                        </div>

                        {/* Submit button */}
                        <button className='btn' type='submit'> Make your reservation </button>
                    </fieldset>
                </form>
            </section>
        </header>
    )    
}

export default BookingForm;