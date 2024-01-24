import React from 'react'
import logo from '../../assests/slope rate.jpeg'
import './Home.css'
function Home() {
  return (
    


<div className="container mx-auto p-4">
      
      
      <div className="lg:flex">
        {/* Left column, full-width on small screens, half-width on larger screens */}
        <div className="lg:w-1/2 mb-4 lg:mb-0">
         <img src={logo} alt='' className='w-full h-[600px] rounded-lg'/>
        </div>
        
        {/* Right column, full-width on small screens, half-width on larger screens */}
        <div className="lg:w-1/2">
          
<img src='https://www.funded.com/blog/wp-content/uploads/2022/06/Funded-image.jpg' alt='' className='w-full  rounded-lg h-[600px]'/>

        </div>
      </div>
    </div>

 



    
  )
}

export default Home