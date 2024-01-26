import React, { useEffect, useState } from 'react';

import {Link} from "react-router-dom"
import './Squads.css';

function Squads({ location }) {
  const { state } = location;
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    console.log(state.gameDetails);
    if (state && state.gameDetails && state.gameDetails.location) {

      const matchDateTime = new Date(state.gameDetails.location);
      updateCountdown(matchDateTime);
      const countdownInterval = setInterval(() => {
        updateCountdown(matchDateTime);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(countdownInterval);
    }
  }, [state]);

  const updateCountdown = (matchDateTime) => {
    const now = new Date();
    const timeDifference = matchDateTime - now;

    console.log("timeDifference", timeDifference);
    console.log("matchDateTime", matchDateTime);

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining(`Remaining Time ${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeRemaining('Match Started');
    }
  };

  if (!state || !state.gameDetails) {
    // Handle invalid state or no gameDetails
    return <div>Error: Invalid state</div>;
  }

  const { gameLocation, dist, date, team } = state.gameDetails;

  return (
    <div>
      <div className='container mx-auto p-4 squad-container'>
      <div className="squad-container-wrapper">
          {/* Display timeRemaining separately */}
          <div className='countdown-container'>
            <Link to="/live-match">
            <button className='start-match'>
            {timeRemaining}
            </button>
            </Link>
          </div>

          <div className='team-details'>
            <h1 className='text-lg border border-2 p-3 bg-green-400 hover:bg-green-500 text-white font-bold rounded-xl justify-center items-center flex w-full'>
              Playing 11
            </h1>
          </div>
 
          <div className='teams-container'>
            {team.map((teamItem) => (
              <div key={teamItem.teamId} className=''>
                <h2 className='justify-center items-center flex p-2 font-bold font-serif px-12'>{teamItem.teamName}</h2>
                <p className='text-sm p-2'> Captain: {teamItem.captainName}</p>
                <p className='text-sm p-2'> Vice Captain: {teamItem.viceCaptainName}</p>
                <ul>
                  {teamItem.teamMembers.map((member, index) => (
                    <li key={index} className='text-sm p-2'> Team Member: {member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Squads;
