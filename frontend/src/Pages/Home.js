import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Blade from "../assets/newblade.jpeg";
import HOD from "../assets/hod.avif";
import Int from "../assets/int.jpg"
import  Mom from '../assets/Mom.jpg'
import  Avatar from '../assets/ava2.jpg'
import MediaCard from "../components/MediaCard";
import NavBar from "../components/NavBar";

import axios from "axios";

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

const slides = [
  {
    img: Blade,
    title: 'Blade Runner 2049',
    year: '2017',
    genre: 'Sci-fi/Action'
  },

  {
    img: HOD,
    title: 'House Of the Dragon',
    year: '2022',
    genre: 'Drama',
  },

  {
    img: Avatar,
    title: 'Avatar: The Way of Water',
    year: '2022',
    genre: 'Sci-fi/Action',
  },

  {
    img: Int,
    title: 'Interstellar',
    year: '2014',
    genre: 'Sci-fi/Adventure',
  },
]

const Home = ({ isSidebarOpen }) => {
  const controls = useAnimationControls();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/movies");
        setMovies(response.data);
        console.log(response.data); // Log the response to check URLs
      } catch (err) {
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/series");
        setSeries(response.data);
        console.log(response.data); // Log the response to check URLs
      } catch (err) {
        setError("Failed to fetch Series.");
      }
    };

    fetchSeries();
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      controls.start("open");
    } else {
      controls.start("close");
    }
  }, [isSidebarOpen, controls]);


    // Auto slider effect

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 6000)

      return () => clearInterval(interval);
    }, []);

    
 
  
  const { img, title, year, genre } = slides[currentSlide];

  return (
    <>
      <motion.div
        variants={dashboardVariants}
        animate={controls}
        initial="close"
        className=" px-5 mr-10 mt-10 text-white"
      >
        <NavBar />

        <div className=" relative border border-neutral-600 px-0 py-10 md:py-0 rounded-lg mt-10 mx-10 mr-0 ">
          <motion.img
            src={img}
            alt="Description of image"
            className="w-101 h-100 object-cover rounded-lg opacity-80"
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration:0.8 }}
          />
          <div className="">
            <motion.h1 className="absolute mt-24 top-20 left-10 text-white text-4xl font-bold p-2  "
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity:1, y: 0 }}
            exit={{ opacity:0, y: 20}}
            transition={{ duration: 0.5 }}
            > 
              {title}
            </motion.h1>
            <motion.p className="absolute mt-32 top-24 left-10 text-white text-2xl   bg-opacity-100 p-2 "
            key={`year-${currentSlide}`}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y:0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 , delay:0.2 }}
            >
              {year}
            </motion.p>
            <motion.p className="absolute mt-36 top-28 left-10 text-white text-lg   bg-opacity-100 p-2 "
            key={`genre-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20}}
            transition={{ duration: 0.5, delay: 0.4 }}

            >
              {genre}
            </motion.p>
            <button className=" absolute left-12 -mt-16 bg-secondary px-6 py-2 rounded-xl shadow-2xl hover:bg-yellow-6  00 ">
              Watch
            </button>
          </div>
          

          <div className="flex flex-col md:grid md:grid-cols-2 ">
            <div className=" flex flex-col justify-center order-2 md:order-1 mb-3 md:mb-0"></div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-8 mx-10 flex justify-between">
            <p className="text-lg md:text-2xl ">Your Movies</p>
          </div>
          //Card 
          <div className="m-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {error && <p>{error}</p>}
              {movies.map((movie) => (
                <a href="#" key={movie._id} >
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
          </div>
          <div className="mb-8 mx-10 flex justify-between">
            <p className="text-lg md:text-2xl ">Your Series</p>
          </div>

          <div className="m-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {error && <p>{error}</p>}
              {series.map((series) => (
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

        <div className=" relative border border-neutral-600 px-0 py-10 md:py-0 rounded-lg mt-10 mx-10 mr-0 ">
        <img
          src={Mom}
          alt="Description of image"
          className="w-101 h-100 object-cover rounded-lg opacity-80"
        />
        <div className="">
          <h1 className="absolute mt-24 top-20 left-10 text-white text-4xl font-bold p-2 ">
            Coming Soon
          </h1>
          <button className=" absolute left-12 -mt-16 bg-secondary px-6 py-2 rounded-xl shadow-2xl hover:bg-yellow-6  00 ">
            Watch
          </button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div className=" flex flex-col justify-center order-2 md:order-1 mb-3 md:mb-0"></div>
        </div>
      </div>

      <div className="mx-10 mt-20 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {error && <p>{error}</p>}
              {movies.map((movie) => (
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
          </div>
      </motion.div>
    </>
  );
};

export default Home;
