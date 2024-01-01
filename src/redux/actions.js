
export const setDate = (date) => ({ type: 'SET_DATE', payload: date });
export const setTime = (time) => ({ type: 'SET_TIME', payload: time });
export const setName = (name) => ({ type: 'SET_NAME', payload: name });
export const setClient = (client) => ({ type: 'SET_CLIENT', payload: client });

export const setStartTime = (startTime) => ({ type: 'SET_START_TIME', payload: startTime });
export const setEndTime = (endTime) => ({ type: 'SET_END_TIME', payload: endTime });


export const bookTimeSlot = () => ({ type: 'BOOK_TIME_SLOT' });
export const loadBookedSlots = () => ({ type: 'LOAD_BOOKED_SLOTS' });
export const addBookedSlot = (newBooking) => ({ type: 'ADD_BOOKED_SLOT', payload: newBooking });
export const deleteBookedSlot = (index) => ({
    type: 'DELETE_BOOKED_SLOT',
    payload: index,
  });
