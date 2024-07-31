import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import axios from "axios";
import NavBar from "../components/NavBar";
import Int from "../assets/Bg.png";
import trending from "../assets/trendingyellow.png"
import  Mom from '../assets/Mom.jpg'

const dashboardVariants = {
  close: {
    marginLeft: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    marginLeft: "17rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const Trending = ({ isSidebarOpen }) => {
  const [trendingData, setTrendingData] = useState({ movies: [], series: [] });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Movies');

  const movies = [
    { title: 'Movie 1'},
    { title: 'Movie 2'},
    { title: 'Movie 3'},
    { title: 'Movie 1'},
    { title: 'Movie 2'},
    { title: 'Movie 3'},
    { title: 'Movie 1'},
    { title: 'Movie 2'},
    { title: 'Movie 3'},
    { title: 'Movie 1'},
    { title: 'Movie 2'},
    { title: 'Movie 3'},
    { title: 'Movie 1'},
    { title: 'Movie 2'},
    { title: 'Movie 3'},
  ]

  const tvSeries = [
    { title: 'TV Series 1' },
    { title: 'TV Series 2' },
    { title: 'TV Series 3' },
  ];

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/trending");
        setTrendingData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchTrendingData();
  }, []);

  const controls = useAnimationControls();

  useEffect(() => {
    if (isSidebarOpen) {
      controls.start("open");
    } else {
      controls.start("close");
    }
  }, [isSidebarOpen, controls]);

  return (

    <motion.div
      variants={dashboardVariants}
      animate={controls}
      initial="close"
      className=" flex flex-col h-screen  px-5 mr-10 mt-10 text-white"
    >

<NavBar />



<div className=" flex-grow px-0 py-10 md:py-0 rounded-lg mt-10 mx-10 mr-0 ">
 <img
          src={Int}
          alt="Description of image"
          className="w-101 h-0 object-cover rounded-lg "
        /> 



    
    </div>

    <div className=" border -mt-40 text-white p-4 mx-5 mr-0">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src={trending} alt='trending' className="w-12 -mt-1" />
          <span className="ml-2 text-3xl font-semibold">Trending</span>

        </div>

        

      </div>

      <div className="flex space-x-8 mx-4 mt-10">
          <button 
           className={`pb-2 ${activeTab === 'Movies' ? 'border-b-2 border-white': ''}`}
           onClick={() => setActiveTab('Movies')}
          >
            Movies
          </button>

          <button
            className={`pb-2 ${activeTab === 'Tv Series' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('Tv Series')}
          >
            Tv Series
          </button>

        </div>
    </div>
   // Trending Card 
    <hr className="mt-4 border-gray-600 mx-5" />
    <div className=" flex-grow mt-10 mx-5">

    <div className="grid grid-cols-3 gap-5 border">
      <div className="trendcard ">
        <img src={Mom} alt="new" className="w-full h-48 object-cover rounded-xl" />
        
       
      </div>
      <div className="border col-span-2">
        <h1 className=" px-6 py-3 text-2xl font-poppins font-semibold ">Oppenheimer</h1>
        <h1 className=" px-6 py-2 text-xl font-poppins font-semibold">2023</h1>
        <div className="flex justify-start items-center ">
        <h1 className=" px-6 py-2 text-xl font-poppins font-semibold">8.5</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary -mx-4 -mt-1">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className=" px-6 py-2 font-poppins font-medium text-gray-300">Trending 1</h1>
      </div>
      <div className="trendcard ">
        <img src={Mom} alt="new" className="w-full h-48 object-cover rounded-xl" />
        
       
      </div>
      <div className="border col-span-2">
        <h1 className=" px-6 py-3 text-2xl font-poppins font-semibold ">Oppenheimer</h1>
        <h1 className=" px-6 py-2 text-xl font-poppins font-semibold">2023</h1>
        <div className="flex justify-start items-center ">
        <h1 className=" px-6 py-2 text-xl font-poppins font-semibold">8.5</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary -mx-4 -mt-1">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className=" px-6 py-2 font-poppins font-medium text-gray-300">Trending 1</h1>
      </div>
      </div>

      
    </div>
    
</motion.div>
  );
};

export default Trending;
