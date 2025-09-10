import BookingForm from "./BookingForm";

const Booking = (props) => {
    return (
        <BookingForm availableTimes={["17:00", "18:00", "19:30", "20:00"]} dispatch={props.dispatch}/>
    )
}

export default Booking;