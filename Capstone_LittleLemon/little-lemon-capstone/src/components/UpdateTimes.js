export function fetchAPI(date) {
    // Simulación para pruebas
    return ["17:00", "18:00", "19:00"];
}

export function updateTimes(state, date) {
    return { availableTimes: fetchAPI(new Date(date)) };
}