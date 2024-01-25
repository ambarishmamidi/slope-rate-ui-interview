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
    <div >
    
    <div className='container mx-auto p-4 squad-container'>
        <div className="squad-container-wrapper">
      <div className='team-details'>
        {/* <h1 className='text-blue-500'>Game Details - {gameId}</h1>
        <p>Location: {gameLocation}</p>
        <p>Dist: {dist}</p>
        <p>Date: {date}</p> */}
        <h1 className='text-lg border border-2 p-3 bg-green-400 hover:bg-green-500 text-white font-bold rounded-xl justify-center items-center flex w-full'>Playing 11</h1>
      </div>

      <div className='teams-container '>
      
        {team.map((teamItem) => (
          <div key={teamItem.teamId} className='  '>
            
            <h2 className=' justify-center items-center flex p-2 font-bold font-serif px-12'>{teamItem.teamName}</h2>
            {/* <p>Team ID: {teamItem.teamId}</p> */}
            <p className='text-sm p-2 '> Captain: {teamItem.captainName}</p>
            <p className='text-sm p-2 '> Vice Captain: {teamItem.viceCaptainName}</p>

            <h3></h3>
            <ul>
              {teamItem.teamMembers.map((member, index) => (
                <li key={index} className=' text-sm p-2'> Team Member: {member}</li>
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
