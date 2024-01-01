// App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookTimeSlot, loadBookedSlots } from './redux/actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './App.css';
import { generateTimeSlots } from './utils';
import { addBookedSlot, deleteBookedSlot  } from './redux/actions';

const durationOptions = [
  { label: '30 minutes', value: 30 },
  { label: '60 minutes', value: 60 },
  { label: '90 minutes', value: 90 },
];

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);

  const dispatch = useDispatch();
  const bookedSlots = useSelector((state) => state.bookedSlots);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when changing the date
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDurationChange = (selectedOption) => {
    setSelectedDuration(selectedOption);
    setSelectedTime(null); // Reset selected time when changing the duration
  };

  const bookTimeSlot = () => {
    const isSlotBooked = bookedSlots.some(
      (slot) => slot.date === selectedDate.toISOString() && slot.time === selectedTime.value
    );

    if (isSlotBooked) {
      alert('Time slot already booked with a name. Please choose another slot.');
    } else {
      const newBooking = { date: selectedDate.toISOString(), time: selectedTime.value, name, client };
      dispatch(addBookedSlot(newBooking));
      alert(`Booking successful for ${selectedTime.label} on ${selectedDate.toDateString()} for ${name} with client ${client}`);
    }
  };
  useEffect(() => {
    // Load booked slots from localStorage on component mount
    dispatch(loadBookedSlots());
  }, []);

  useEffect(() => {
    // Save booked slots to localStorage whenever bookedSlots changes
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  const handleDeleteSlot = (index) => {
    const deletedSlot = bookedSlots[index];
    // Dispatch an action to remove the slot from the Redux state
    // Here, assume you have an action named 'deleteBookedSlot'
    // that takes the index as a parameter
    dispatch(deleteBookedSlot(index));

    // Alert or any other action you want after deletion
    alert(`Booking for ${deletedSlot.time} on ${new Date(deletedSlot.date).toDateString()} has been deleted.`);
  };

  return (
    <div className="App">
      <div className="booking-container">
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM, yyyy"
        />

        {selectedDate && (
          <>
            <h2>Select Time Duration</h2>
            <Select options={durationOptions} value={selectedDuration} onChange={handleDurationChange} />

            {
              selectedDuration && (
                <>
                  <h2>Select Time</h2>
                  <Select
                    options={generateTimeSlots(selectedDuration.value, bookedSlots).filter(
                      (option) =>
                        !bookedSlots.some(
                          (slot) => slot.date === selectedDate.toISOString() && slot.time === option.value
                        )
                    )}
                    value={selectedTime}
                    onChange={(time) => setSelectedTime(time)}
                  />

                  <h2>Enter Details</h2>
                  <label>Name:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                  <label>Client:</label>
                  <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />

                  <button onClick={bookTimeSlot}>Book Slot</button>
                </>
              )}
          </>
        )}
      </div>

      <div className="booked-slots-container">
        <div className="booked-slots-left">
          <h2>Booked Slots</h2>
          {bookedSlots.map((bookedSlot, index) => (
            <div key={index} className="booked-slot">
              <p>{new Date(bookedSlot.date).toLocaleDateString()} - {bookedSlot.time}</p>
            </div>
          ))}
        </div>

        <div className="booked-slots-right">
          <h2>Details</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Client</th>
                <th>Delete Slot</th>
              </tr>
            </thead>
            <tbody>
              {bookedSlots.map((bookedSlot, index) => (
                <tr key={index}>
                  <td>{new Date(bookedSlot.date).toLocaleDateString()}</td>
                  <td>{bookedSlot.time}</td>
                  <td>{bookedSlot.name}</td>
                  <td>{bookedSlot.client}</td>
                  <td><button onClick={() => handleDeleteSlot(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default App;