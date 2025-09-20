import BookingForm from "./BookingForm";

const Booking = (props) => {

    const handleSubmitForm = (formData) => {
        console.log("Form data submitted:", formData);
    }

    const fetchTimes = (date) => {
        console.log("Fetching times for date:", date);
    }
    return (
        <BookingForm availableTimes={props.availableTimes} dispatch={props.dispatch} fetch={fetchTimes} SubmitForm={handleSubmitForm}/>
    )
}

export default Booking;