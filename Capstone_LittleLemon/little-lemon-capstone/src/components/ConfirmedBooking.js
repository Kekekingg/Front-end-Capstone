function ConfirmedBooking() {
    return (
        <div className="confirmed-booking">
            <h1>Booking has been <span>confirmed!</span></h1>
            <img src="https://img.icons8.com/?size=100&id=11208&format=png&color=40C057" alt="Confirmed Icon"/>
            <p>Thank you for your reservation. We look forward to serving you!</p>
            <button onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
    )
}

export default ConfirmedBooking;