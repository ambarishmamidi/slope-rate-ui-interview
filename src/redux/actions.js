// actions.js
export const ADD_BOOKED_SLOT = 'ADD_BOOKED_SLOT';
export const DELETE_BOOKED_SLOT = 'DELETE_BOOKED_SLOT';
export const LOAD_BOOKED_SLOTS = 'LOAD_BOOKED_SLOTS';

export const addBookedSlot = (newBooking) => ({
  type: ADD_BOOKED_SLOT,
  payload: newBooking,
});

export const deleteBookedSlot = (index) => ({
  type: DELETE_BOOKED_SLOT,
  payload: index,
});

export const loadBookedSlots = (bookedSlots) => ({
  type: LOAD_BOOKED_SLOTS,
  payload: bookedSlots,
});
