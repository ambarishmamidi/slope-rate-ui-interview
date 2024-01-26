import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

function LiveScore(props) {
  const { gameDetails } = props.location.state;
  const [tossWinner, setTossWinner] = useState(null);
  const [decision, setDecision] = useState(null);

  if (!gameDetails) {
    // Handle invalid state or no gameDetails
    return <div>Error: Invalid state</div>;
  }

  const { gameId, location: gameLocation, dist, date, team } = gameDetails;

  const handleTeamSelection = (selectedTeam) => {
    setTossWinner(selectedTeam);
  };

  const handleDecision = (decision) => {
    setDecision(decision);
  };

  return (
    <div className='container mx-auto p-4 '>
      <h1 className='bg-pink-200 text-center rounded-md'>Live Cricket Score</h1>

      {!tossWinner && (
        <div className='mt-4'>
          <span className='font-bold text-xl mr-4'>Who won the Toss</span>
          {team.map((teamItem) => (
            <button
              key={teamItem.teamId}
              className='bg-green-400 text-white p-2 rounded-md font-bold mr-4'
              onClick={() => handleTeamSelection(teamItem.teamName)}
            >
              {teamItem.teamName}
            </button>
          ))}
        </div>
      )}

      {tossWinner && !decision && (
        <div className='mt-4'>
          <span className='font-bold text-xl mr-4'>{`${tossWinner} chose to`}</span>
          <button
            className='bg-blue-400 text-white p-2 rounded-md font-bold mr-4'
            onClick={() => handleDecision('Bat')}
          >
            Bat
          </button>
          <button
            className='bg-blue-400 text-white p-2 rounded-md font-bold'
            onClick={() => handleDecision('Bowl')}
          >
            Bowl
          </button>
        </div>
      )}

      {decision && (
        <div className='mt-4'>
          <p className='text-xl font-bold'>
            {`${tossWinner} has chosen to ${decision.toLowerCase()}.`}
          </p>

          {/* Display results based on the selected team */}
          {team.map((teamItem) => (
            <div key={teamItem.teamId}>
              {tossWinner === teamItem.teamName && (
                <p className='text-xl font-bold'>{/* Display results for teamItem.teamName */}</p>
              )}
            </div>
          ))}
          <div>
          <Table striped="columns">
      <thead>
        <tr>
          <th>Batter</th>
          <th>R</th>
          <th>B</th>
          <th>4S</th>
          <th>6S</th>
          <th>SR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Shadrak</td>
          <td>100</td>
          <td>50</td>
          <td>20</td>
          <td>2</td>
          <td>200</td>
        </tr>
        <tr>
          <td>Raju</td>
          <td>50</td>
          <td>50</td>
          <td>10</td>
          <td>1</td>
          <td>100</td>
        </tr>
       
      </tbody>
    </Table>
          </div>
          <div>
          <Table striped="columns">
      <thead>
        <tr>
          <th>Bowlers</th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>w</th>
          <th>Eco</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ramesh</td>
          <td>10</td>
          <td>5</td>
          <td>40</td>
          <td>2</td>
          <td>6.36</td>
        </tr>
        <tr>
          <td>tiru</td>
          <td>5</td>
          <td>5</td>
          <td>10</td>
          <td>5</td>
          <td>1.6</td>
        </tr>
       
      </tbody>
    </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveScore;
