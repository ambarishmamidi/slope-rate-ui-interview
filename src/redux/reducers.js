// src/redux/reducers.js
const initialState = {
  selectedDate: null,
  selectedTime: null,
  name: '',
  client: '',
  bookedSlots: []
};

const rootReducer = (state = initialState, action) => {
  console.log("Thiru Action 2222");
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_TIME':
      return { ...state, selectedTime: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_CLIENT':
      return { ...state, client: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload.time.split(' - ')[0] };
    case 'SET_END_TIME':
      return { ...state, endTime: action.payload.time.split(' - ')[1] };
    case 'BOOK_TIME_SLOT':
      return {
        ...state,
        bookedSlots: [
          ...state.bookedSlots,
          {
            date: state.selectedDate.toISOString(),
            time: state.selectedTime.value,
            name: state.name,
            client: state.client,
            startTime: state.selectedTime.value.startTime,
            endTime: state.selectedTime.value.endTime
          },
        ],
      };
    case 'LOAD_BOOKED_SLOTS':
      console.log("LOAD_BOOKED_SLOTS",action.payload)
      // Load booked slots from localStorage
      const storedBookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];
      return { ...state, bookedSlots: storedBookedSlots };
    //return state;
    case 'ADD_BOOKED_SLOT':
      
      const storeTime = JSON.parse(localStorage.getItem('newBooking')) || [];

      return { ...state, bookedSlots: [...state.bookedSlots, action.payload] };
    case 'DELETE_BOOKED_SLOT':
      return {
        ...state,
        bookedSlots: state.bookedSlots.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
