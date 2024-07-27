import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import axios from "axios";
import MediaCard from "../components/MediaCard";
import NavBar from "../components/NavBar";

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
    <div>
      //Render Trending
      {error && <p>{error}</p>}

      <h2>Trending Movies</h2>
      <div className="m-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
          {error && <p>{error}</p>}
          {trendingData.movies.map((movie) => (
            <a href="#" key={movie._id}>
              <MediaCard
                id={movie._id} // Use movie._id for the id
                type="movie" // Set type to "movie"
                image={movie.imageUrl}
                title={movie.title}
                releaseDate={movie.moviedate} // Make sure this matches your movie model property
                ratings={movie.ratings}
              />
            </a>
          ))}
        </div>

        <h2>Trending Series</h2>
        <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {error && <p>{error}</p>}
              {trendingData.series.map((series) => (
                <a href="#" key={series._id} >
                  <MediaCard
                    id={series._id} // Use series._id for the id
                    type="series" // Set type to "series"
                    image={series.imageUrl}
                    title={series.title}
                    releaseDate={series.moviedate} // Make sure this matches your series model property
                    ratings={series.ratings}
                  />
                </a>
              ))}
            </div>
          </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Trending;
