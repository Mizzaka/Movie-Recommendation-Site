import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import axios from "axios";
import NavBar from "../components/NavBar";
import CategoryCard from "../components/CategoryCard";
import Int from "../assets/Bg.png";

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

    <div className="  bg-secondary mt-10 text-white p-4 mx-10 mr-0">
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-semibold">Trending</span>

        </div>

      </div>
    </div>
    
</motion.div>
  );
};

export default Trending;
