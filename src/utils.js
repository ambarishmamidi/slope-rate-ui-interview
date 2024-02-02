
export const generateTimeSlots = (duration, bookedSlots= []) => {
  const startTime = 6;
  const endTime = 21;
  const timeSlots = [];
  console.log(startTime)
  console.log(endTime)

  let currentMinute = 0; // Initialize currentMinute to track time accurately

  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = currentMinute; minute < 60; minute += duration) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      let nextHour = hour;
      let nextMinute = minute + duration;

      if (nextMinute >= 60) {
        nextHour += 1; // Increment hour directly if nextMinute exceeds 60
        nextMinute = nextMinute % 60; // Correctly calculate nextMinute
      }

      console.log("---", bookedSlots);

      const label = `${time} - ${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;
      const startTime = `${time}`;
      const endTime = `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(3, '0')}`;

      console.log(startTime)
      console.log(endTime)

      timeSlots.push({ label, value: label });
      

      currentMinute = nextMinute; // Update currentMinute for subsequent iterations
    }

    currentMinute = 0; // Reset currentMinute for the next hour
  }

  return timeSlots;
};