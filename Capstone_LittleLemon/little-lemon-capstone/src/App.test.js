import { updateTimes, fetchAPI } from './components/UpdateTimes';

describe('updateTimes reducer', () => {
    it('should update availableTimes based on the date', () => {
        const initialState = { availableTimes: ["17:00"] };
        const date = "2024-09-18";
        const newState = updateTimes(initialState, date);
        expect(newState.availableTimes).toEqual(fetchAPI(new Date(date)));
    });

    it('should return a new state object', () => {
        const initialState = { availableTimes: ["17:00"] };
        const date = "2024-09-18";
        const newState = updateTimes(initialState, date);
        expect(newState).not.toBe(initialState);
    });
});