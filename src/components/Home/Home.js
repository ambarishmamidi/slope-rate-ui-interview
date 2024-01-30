import React from 'react'
import logo from '../../assests/slope rate.jpeg'
import './Home.css'
function Home() {
  return (
    


<div className="container mx-auto p-4">
      
      
      <div className="lg:flex border-2 border-slate-300 rounded-md p-2">
        {/* Left column, full-width on small screens, half-width on larger screens */}
        <div className="lg:w-1/2 mb-4 lg:mb-0 mr-5">
         <img src={logo} alt='' className='w-full h-[500px] rounded-lg'/>
        </div>
        
        {/* Right column, full-width on small screens, half-width on larger screens */}
        <div className="lg:w-1/2">
        <div className=''>
    <div className="justify-center items-center flex flex-col  ">
    
      <h5 className="text-2xl font-bold tracking-tight text-yellow-900 dark:text-white font-serif">
      ABOUT OUR PLACEMENT SERVICES

      </h5>
      <p className=" text-gray-700 dark:text-gray-400 text-lg">
      <b>Slopr Rate Techno </b>can provide significant benefits to a tech company in need of talent acquisition.
       By leveraging their expertise in recruitment and staffing, We offer a streamlined hiring process that saves
        time and resources for the company. This includes the initial screening of resumes and scheduling of interviews,
         as well as conducting thorough background checks and skill assessments. This not only ensures that the company finds
          the right candidates for the job, but also reduces the risk of bad hires and turnover. Moreover,
          <a href='https://sloperateinc.com/'> Slope rate Techno </a>can offer access to a wider pool of candidates and niche skill sets, which may not be readily available through traditional recruitment channels. With these advantages, our staffing solution can help tech companies maintain 
      a competitive edge in the market by hiring the best talent efficiently and effectively      </p>
    </div>
    </div>
        </div>
      </div>








      <div className='border-2 border-slate-300 rounded-md mt-3 p-3'>
      <div className='flex justify-center items-center text-2xl font-bold tracking-tight text-yellow-700 font-serif mt-5'>Why Choose us</div>
      <div className='md:flex  gap-3 mt-8' >
      <div className=' border-2 broder-black rounded-md p-2'>
      <div className="md:w-1/2">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      TRUST
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Trust is paramount when choosing a partner to assist you with your needs. At Slope Rate, we prioritize building trust with our clients by providing reliable and professional services.
      </p>
      <button className='bg-blue-600 p-1 px-4 rounded-md text-white'>
        Read more
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>

      </div>
      <div className=' w-full border-2 broder-black rounded-md p-2'>
      <div className="md:w-1/2">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      AFFORDABLE
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      We believe in affordability when it comes to pricing. Our clients can expect clear and comprehensive pricing information upfront, without any hidden costs or surprises.

</p>
      <button className='bg-blue-600 p-1 px-4 rounded-md  text-white'>
        Read more
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>

      </div>
      <div className=' w-full border-2 broder-black rounded-md p-2'>
      <div className="md:w-1/2">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      EVALUATION
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      At Slope Rate, we take great pride in our track record of delivering high success rates in placements for each individuals seeking employment opportunities.

</p>
      <button className='bg-blue-600 p-1 px-4 rounded-md text-white'>
        Read more
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>

      </div>
      </div>
    </div>

      
    </div>

 



    
  )
}

export default Home