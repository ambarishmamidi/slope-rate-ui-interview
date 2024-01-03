// App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookedSlot, deleteBookedSlot, loadBookedSlots } from './redux/actions';
import { generateTimeSlots } from './utils';
import './App.css';

const durationOptions = [
  { label: '30 minutes', value: 30 },
  { label: '60 minutes', value: 60 },
  { label: '90 minutes', value: 90 },
];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const bookedSlots = useSelector((state) => state.bookedSlots);

  useEffect(() => {
    // Load booked slots from the backend on component mount
    fetchBookedSlots();
  }, []);

  const fetchBookedSlots = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://booking-service-calender-java-5e83bcc54d63.herokuapp.com/api/bookings', {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch booked slots. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Empty response or invalid JSON format');
      }

      dispatch(loadBookedSlots(data));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedTime(null); // Reset selected time when changing the date
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(durationOptions.find((option) => option.label === e.target.value));
    setSelectedTime(null); // Reset selected time when changing the duration
  };

  const bookTimeSlot = async () => {
    // Validate form inputs
    if (!selectedDate || !selectedTime || !selectedDuration || !name || !client) {
      alert('Please fill in all details before booking.');
      return;
    }

    const isSlotBooked = bookedSlots.some(
      (slot) =>
        new Date(slot.date).toISOString() === selectedDate.toISOString() &&
        slot.time === selectedTime.value
    );

    if (isSlotBooked) {
      alert('Time slot already booked with a name. Please choose another slot.');
    } else {
      const newBooking = {
        date: selectedDate.toISOString(),
        time: selectedTime.value,
        name,
        client,
      };

      try {
        // Add a new booking to the backend
        const response = await fetch('https://booking-service-calender-java-5e83bcc54d63.herokuapp.com/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBooking),
        });

        if (!response.ok) {
          throw new Error('Failed to add booking');
        }

        // Update Redux state and alert on successful booking
        dispatch(addBookedSlot(newBooking));
        alert(`Booking successful for ${selectedTime.label} on ${selectedDate.toDateString()} for ${name} with client ${client}`);
      } catch (error) {
        console.error('Error adding booking:', error);
      }
    }
  };

  const handleDeleteSlot = async (index) => {
    const password = prompt('Please enter the password to delete the slot:');
    if (password === '522552') {
      const deletedSlot = bookedSlots[index];

      try {
        // Delete the booking from the backend
        const response = await fetch(`https://booking-service-calender-java-5e83bcc54d63.herokuapp.com/api/bookings/${index}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }

        // Update Redux state and alert on successful deletion
        dispatch(deleteBookedSlot(index));
        alert(`Booking for ${deletedSlot.time} on ${new Date(deletedSlot.date).toDateString()} has been deleted.`);
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    } else {
      alert('Wrong password. Deletion failed.');
    }
  };

  return (
    <div className="App">
      <div className="booking-container">
        <h2>Select Date</h2>
        <input type="date" onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />

        {selectedDate && (
          <>
            <h2>Select Time Duration</h2>
            <select onChange={handleDurationChange}>
              <option value="" disabled selected>
                Select Duration
              </option>
              {durationOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedDuration && (
              <>
                <h2>Select Time</h2>
                <select
                  value={selectedTime ? selectedTime.value : ''}
                  onChange={(e) =>
                    setSelectedTime(
                      generateTimeSlots(selectedDuration.value, bookedSlots).find(
                        (slot) => slot.value === e.target.value
                      )
                    )
                  }
                >
                  <option value="" disabled selected>
                    Select Time
                  </option>
                  {generateTimeSlots(selectedDuration.value, bookedSlots).map((slot) => (
                    <option key={slot.label} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>

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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            bookedSlots.map((bookedSlot, index) => (
              <div key={index} className="booked-slot">
                <p>
                  {new Date(bookedSlot.date).toLocaleDateString()} - {bookedSlot.time}
                </p>
              </div>
            ))
          )}
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
                  <td>
                    <button onClick={() => handleDeleteSlot(index)}>Delete</button>
                  </td>
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
