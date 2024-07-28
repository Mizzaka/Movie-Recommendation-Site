import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import axios from "axios";
import NavBar from "../components/NavBar";
import CategoryCard from "../components/CategoryCard";
import Int from "../assets/Bg.png";
import trending from "../assets/trendingyellow.png"

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
  ]

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
      className="px-5 mr-10 mt-10 text-white"
    >

<NavBar />



<div className="  px-0 py-10 md:py-0 rounded-lg mt-10 mx-10 mr-0 ">
 <img
          src={Int}
          alt="Description of image"
          className="w-101 h-0 object-cover rounded-lg "
        /> 



    
    </div>

    <div className=" border mt-5 text-white p-4 mx-5 mr-0">
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

    <hr className="mt-4 border-gray-600 mx-5" />
    <div className="mt-4">
      {activeTab === 'Movies' && (
        <div className="space-y-2">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded">
              {movie.title}
            </div>
          ))}

        </div>
      )}

    </div>
    
</motion.div>
  );
};

export default Trending;
