/* BookingPage.js */


import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addBookedSlot, deleteBookedSlot, loadBookedSlots } from "../redux/actions";
import { generateTimeSlots } from '../utils';

import "./BookingPage.css"

const durationOptions = [
    { label: '30 minutes', value: 30 },
    { label: '60 minutes', value: 60 },
    { label: '90 minutes', value: 90 },
  ];
  
 
const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [showQuiz, setShowQuiz] = useState(false);

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

  const obfuscatePassword = (password) => {
    // Replace this simple encoding with a more secure hashing algorithm in a real-world scenario
    return btoa(password);
  };

  const handleDeleteSlot = async (index) => {
    const encodedPassword = obfuscatePassword('7575'); // Change '7575' to your new password

    const userInput = prompt('Please enter the password to delete the slot:');
    const userEncodedPassword = obfuscatePassword(userInput);

    if (userEncodedPassword === encodedPassword) {
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

  /* const handleQuizLinkClick = () => {
    setShowQuiz(true);
  }; */

  const handleQuizSubmit = (answers) => {
    // Submit answers to the backend

    const flattenedAnswers = {
      candidateId: answers.user.candidateId,
      candidateName: answers.user.candidateName,
      questions:answers.questions
    };
  
    // Submit flattened answers to the backend
    console.log('Flattened Answers:', flattenedAnswers);


    // Assuming you have a backend endpoint to store the answers
     //You can make a POST request to store the answers
     //Example:
     fetch('https://slopre-rate-exam-a315a351a951.herokuapp.com/question/submit', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(flattenedAnswers),
     })
     .then(response => response.json())
     .then(data => console.log('Answers submitted successfully:', data))
     .catch(error => console.error('Error submitting answers:', error));
  };      
return (
    <div className=''  style={{
      width: "100%",
      position: "fixed",
      height: "calc(100vh - 68px- 30px)",marginTop:"70px"
    }}>
      
    <div className="booking-container mt-5 mb-5 border-4 rounded-lg">
      <div className='flex justify-center items-center flex-row'>
          <h2 className='text-xl font-semibold mr-6 ml-4'>Select Date </h2>
          <input type="date" onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} className=' border-2 border-black rounded-lg p-2 ' />
          </div>
          {selectedDate && (
            <>
             <div className='flex justify-center items-center flex-row mt-2'>
               <h2 className='text-xl font-semibold mr-2 '>Time Duration </h2>
              <select onChange={handleDurationChange} className=' border-2 border-black rounded-lg p-2 '>
                <option value="" >
                  Select Duration
                </option>
                {durationOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
</div>
              {selectedDuration && (
                <>
                <div className='flex justify-center items-center flex-row mt-2'>
                  <h2 className='text-xl font-semibold mr-3 '>Select Time</h2>
                  <select  className='border-2 border-black rounded-lg p-2 px-2 '
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
                  </div>
                  <div className=' border shadow-md rounded-lg mt-5 p-5'>
                  <h2 className='   shadow-red-500 text-2xl font-bold text-blue-500 mb-5'>Enter Details</h2>
                  <label className='text-lg mr-4'>Name:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded-lg p-2 mr-16 h-12 w-96 ' />

                  <label className='text-lg mr-4'>Client:</label>
                  <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className='border-2 border-black rounded-lg p-2 mr-16 h-12 w-96'/>

                  <button onClick={bookTimeSlot} className=' text-white font-semibold bg-blue-500 hover:bg-blue-600  rounded-lg p-2 px-4 '>Book Slot</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="booked-slots-container flex border-2 rounded-lg p-3 gap-5">
          <div className="basis-1/4 bg-pink-500 shadow-lg shadow-black rounded-full h-96 justify-center items-center flex flex-col">
            <h2 className='text-xl font-bold font-serif  p-3  rounded-xl  justify-center items-center flex'>Booked Slots</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              bookedSlots.map((bookedSlot, index) => (
                <div key={index} className="booked-slot">
                  <p className='text-white font-semibold justify-center items-center flex'>
                    {new Date(bookedSlot.date).toLocaleDateString()} - {bookedSlot.time}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="booked-slots-right h-96  basis-3/4">
            <h2 className='text-xl font-bold font-serif border-2 p-3 text-red-500 rounded-xl shadow-md justify-center items-center flex'>Booked Slot Details here</h2>
            <table className='w-full border-collapse border-2 border-slate-300'>
              <thead>
                <tr>
                  <th className='text-center border-2 border-slate-300 bg-indigo-800 text-white font-bold p-2'>Date</th>
                  <th className='text-center border-2 border-slate-300 bg-indigo-800 text-white font-bold p-2'>Time</th>
                  <th className='text-center border-2 border-slate-300 bg-indigo-800 text-white font-bold p-2 '>Name</th>
                  <th className='text-center border-2 border-slate-300 bg-indigo-800 text-white font-bold p-2 '>Client</th>
                  <th className='text-center border-2 border-slate-300 bg-indigo-800 text-white font-bold p-2 '>Delete Slot</th>
                </tr>
              </thead>
              <tbody>
                {bookedSlots.map((bookedSlot, index) => (
                  <tr key={index}>
                    <td className='text-center border-2 border-slate-300  '>{new Date(bookedSlot.date).toLocaleDateString()}</td>
                    <td className='text-center border-2 border-slate-300  '>{bookedSlot.time}</td>
                    <td className='text-center border-2 border-slate-300  '>{bookedSlot.name}</td>
                    <td className='text-center border-2 border-slate-300  '>{bookedSlot.client}</td>
                    <td className='text-center border-2 border-slate-300'>
                      <button onClick={() => handleDeleteSlot(index)} className='  bg-red-400 px-4  font-bold p-2 hover:bg-red-500  rounded-md hover:text-white  '>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          </div>
    )
}
export default BookingPage 

