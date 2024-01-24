// Match.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Match() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    axios.get("https://slopre-rate-exam-a315a351a951.herokuapp.com/schedule").then(res => {
      setData(res.data);
    });
  }, []);

  

  return (
    <div className='border-2 border-slate-400 rounded-lg shadow-md shadow-black p-3 h-[720px] bg-gray-100' style={{
      width: "100%",
      position: "fixed",
      height: "calc(100vh - 68px- 30px)",
      marginTop: "80px"
    }}>
      <div className='grid grid-cols-4 h-32 gap-3'>
        {data.map((item, index) => (
          <div className='border p-1 border-gray-300 bg-white rounded-lg shadow-md shadow-black  justify-center items-center flex flex-col' key={index}>
            <h1 className='text-xs text-Zinc-500 font-bold'>Slope Rate T20 league . 2024<b className='rounded-full bg-zinc-700 px-2 text-white ml-3'>T20</b></h1>
            <div>
              <div className='justify-start flex flex-row items-center'>
                <h2 className='mb-0 font-bold text-md text-red-600'> {item.team[0].teamName} VS {item.team[1].teamName} </h2>
              </div>
              <p className='text-slate-600 text-xs'>{item.date} {item.location} ,{item.dist}.</p>
            </div>
            <div className=''>
              <Link to={{
                pathname: `/schedule/${item.gameId}`,
                state: { gameDetails: item } // Pass the data as state
              }} className='text-md hover:underline hover:text-red-500 text-blue-500 font-semibold text-mono'>CLICK</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Match;
