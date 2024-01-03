// reducers.js
import { ADD_BOOKED_SLOT, DELETE_BOOKED_SLOT, LOAD_BOOKED_SLOTS } from './actions';

const initialState = {
  bookedSlots: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKED_SLOT:
      return {
        ...state,
        bookedSlots: [...state.bookedSlots, action.payload],
      };
    case DELETE_BOOKED_SLOT:
      return {
        ...state,
        bookedSlots: state.bookedSlots.filter((_, index) => index !== action.payload),
      };
    case LOAD_BOOKED_SLOTS:
      return {
        ...state,
        bookedSlots: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
