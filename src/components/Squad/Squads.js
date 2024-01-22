// Squads.js
import React from 'react';
import './Squads.css'; // Import the CSS file for styling

function Squads({ location }) {
  const { state } = location;

  if (!state || !state.gameDetails) {
    // Handle invalid state or no gameDetails
    return <div>Error: Invalid state</div>;
  }

  const { gameId, location: gameLocation, dist, date, team } = state.gameDetails;

  return (
    <div className='justify-center items-center flex w-full'>
    <div className='squad-container'>
      <div className='team-details'>
        <h1 className='text-blue-500'>Game Details - {gameId}</h1>
        <p>Location: {gameLocation}</p>
        <p>Dist: {dist}</p>
        <p>Date: {date}</p>
      </div>

      <div className='teams-container '>
        {team.map((teamItem) => (
          <div key={teamItem.teamId} className='team-card border-2 rounded-xl  '>
            <h2 className='text-red-500'>{teamItem.teamName}</h2>
            {/* <p>Team ID: {teamItem.teamId}</p> */}
            <p> Captain: {teamItem.captainName}</p>
            <p> Vice Captain: {teamItem.viceCaptainName}</p>

            <h3>Team Members</h3>
            <ul>
              {teamItem.teamMembers.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Squads;
