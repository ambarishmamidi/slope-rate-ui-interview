// Match.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Match() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    axios.get("https://sloperate-interview-6d3724f9f5ca.herokuapp.com/schedule").then(res => {
      setData(res.data);
    });
  }, []);

  

  return (
    <div className='container mx-auto p-4' >
      <div className='lg:flex mb-4 lg:mb-0 grid grid-cols-1 gap-5'>
        {data.map((item, index) => (
          <div className='border p-1 border-gray-300 bg-white rounded-lg shadow-md shadow-black  justify-center items-center flex flex-col' key={index}>
            <h1 className='text-xs text-Zinc-500 font-bold'>Slope Rate T20 league . 2024<b className='rounded-full bg-zinc-700 px-2 text-white ml-3'>T20</b></h1>
            <div>
              <div className='justify-start flex flex-row items-center'>
                <h4 className='mb-0 font-bold  text-red-600'> {item.team[0].teamName} VS {item.team[1].teamName} </h4>
              </div>
              <p className='text-slate-600 text-xs'>{item.date} {item.location} ,{item.dist}.</p>
            </div>
            <div className=''>
              <Link to={{
                pathname: `/schedule/${item.gameId}`,
                state: { gameDetails: item } // Pass the data as state
              }} className='text-md hover:underline hover:text-red-500 text-blue-500 font-semibold text-mono mr-4'>CLICK</Link>
              <Link to={{
                pathname: `/live/${item.gameId}`,
                state: { gameDetails: item } // Pass the data as state
              }} className='text-md hover:underline hover:text-red-500 text-blue-500 font-semibold text-mono'>Live Score</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Match;
