
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { IoPersonCircleOutline } from 'react-icons/io5';



function Squads() {
   
const [teamData, setTeamData] = useState([]);
const {id} = useParams();

useEffect(() => {
  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`https://slopre-rate-exam-a315a351a951.herokuapp.com/schedule/${id}`);

      // Extracting team data from the response
      const teams = response.data.map(game => game.team).flat();
console.log(teams)
      setTeamData(teams);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

  fetchTeamData();
}, []);
    
  return (
    <div className=' border-2 border-slate-400 rounded-lg shadow-md shadow-black p-3 h-[720px] bg-gray-100 overflow-y-scroll'  style={{
        width: "100%",
        position: "fixed",
        height: "calc(100vh - 68px- 30px)",marginTop:"100px"
      }}>
         <div className='flex items-center justify-center  text-[#0054a6] text-xl'>
          <div className='flex justify-start items-center  text-white bg-[#0054a6] w-full'>
          
       <div className="p-1 mr-5 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Live Score</button>
       </div>
       <div className="p-1 mr-5 ">
        <button className="font-semibold cursor- bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Schedules</button>
       </div>
       <div className="p-1 mr-5 ">
        <button   className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">News</button>
       </div>
          <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Images</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Videos</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Teams</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Ranking</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Series</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Achives</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">More</button>
       </div>
       <div className="p-1 mr-2 ">
        <button  className="font-semibold cursor-pointer bg-[#0054a6] px-2 rounded-md text-lg hover:bg-white hover:text-[#0054a6] hover:rounded-lg p-1 ">Cricbuzz Plus</button>
       </div>
       <div className="p-1 mr-2 ">
      <input type='search' placeholder='Search..'  className='cursor-pointer border-black border w-22 h-17 rounded-md'/>
      </div>
       <div className="p-1 mr-2 ">
       <IoPersonCircleOutline  style={{width:'35px', height:'35px'}}/>
       </div>
       
       </div>
       </div>



<h1 className='text-center flex justify-center items-center font-bold text-2xl border-2 border-slate-300 rounded-lg shadow-mg shadow-black'>Playing 11</h1>


<ul  className='grid grid-cols-4 border-4 p-2 gap-3'>
        {teamData.map(team => (
          <li key={team.teamId}>
            <h2 className='text-red-400 font-bold  border-2 border-black justify-center flex items-center rounded-lg'>{team.teamName}</h2>
            <p className='justify-center flex items-center rounded-lg'>Captain: {team.captainName}</p>
            <p className='justify-center flex items-center rounded-lg'>Vice Captain: {team.viceCaptainName}</p>
            <ul>
              {team.teamMembers.map(member => (
                <li className='justify-center flex items-center rounded-lg' key={member}>{member}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    
    )
}
   
  
  
  
    
 

export default Squads