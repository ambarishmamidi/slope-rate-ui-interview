import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Match() {
    const [data,setData]=useState([]);
useEffect(()=>{
 axios.get("https://slopre-rate-exam-a315a351a951.herokuapp.com/schedule").then(res=>{
    setData(res.data)  
  })
},[])


   

  return (
    
         <div className=' border-2 border-slate-400 rounded-lg shadow-md shadow-black p-3 h-[720px] bg-gray-100'  style={{
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



       <div className=' grid grid-cols-8 h-32  gap-3'>


      
       {
        data.map((item ,index) => 
                <div className='border p-1 border-gray-300 rounded-lg  shadow-md shadow-black bg-red-400 justify-center items-center flex flex-col' key={index} >
                <h1 className=' text-xs text-Zinc-500 font-bold '>Slope Rate T20 league . 2024<b className='rounded-full bg-zinc-700 px-2 text-white ml-3'>T20</b> </h1>
                <div>
                    <div className='justify-start flex flex-row items-center'>
                    <h2 className=' mb-0 font-bold text-md text-white'> India VS Australia</h2> 
                </div>
                
               <p className='  text-white text-xs'>{item.date} {''}.{item.location} ,{item.dist}.
            </p>
                </div>
                <div className=''>
                    <Link to={`/squad/${item.gameId}`}className='text-md hover:underline hover:text-red-500 text-blue-500 font-semibold text-mono' >CLICK </Link>
                </div>
            </div>
                
            )
        
        
       }
     </div>

    </div>
    
  )
}

export default Match