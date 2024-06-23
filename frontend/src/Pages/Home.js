import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Blade from "../assets/newblade.jpeg";
import MovieCard from "../components/MovieCard";

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

const Home = ({ isSidebarOpen }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isSidebarOpen) {
      controls.start("open");
    } else {
      controls.start("close");
    }
  }, [isSidebarOpen, controls]);

  return (
    <>
      <motion.div
        variants={dashboardVariants}
        animate={controls}
        initial="close"
        className=" px-5 mr-10 mt-20 text-white"
      >
        <div className=" relative border border-neutral-600 px-0 py-10 md:py-0 rounded-lg mt-10 mx-20 mr-5 ">
          <img
            src={Blade}
            alt="Description of image"
            className="w-101 h-100 object-cover rounded-lg opacity-80"
          />
          <div className="">
            <h1 className="absolute mt-24 top-20 left-10 text-white text-4xl font-bold p-2 ">
              Blade Runner 2049
            </h1>
            <p className="absolute mt-32 top-24 left-10 text-white text-2xl   bg-opacity-100 p-2 ">
              2017
            </p>
            <p className="absolute mt-36 top-28 left-10 text-white text-lg   bg-opacity-100 p-2 ">
              Sci-fi/Action
            </p>
            <button className=" absolute left-12 -mt-16 bg-secondary px-6 py-2 rounded-xl shadow-2xl hover:bg-yellow-6  00 ">
              Watch
            </button>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 ">
            <div className=" flex flex-col justify-center order-2 md:order-1 mb-3 md:mb-0"></div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 mx-20 flex justify-between">
            <p className="text-lg md:text-2xl ">Your Movies</p>
          </div>
       
       <div className="m-20 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
            
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            {/* Add more MovieCard components as needed */}
          </div>
          </div>
        </div>

      </motion.div>
    </>
  );
};

export default Home;
