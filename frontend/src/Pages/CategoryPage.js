import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import NavBar from "../components/NavBar";
import Sify from '../assets/catgory/Avatar.jpg';
import Action from '../assets/catgory/action.webp';
import Fantasy from '../assets/catgory/fantasy.webp';
import Horror from "../assets/catgory/horror.jpg"
import War from "../assets/catgory/war.webp"
import Int from '../assets/int.jpg'
import  Mom from '../assets/Mom.jpg'
import  Thriller from '../assets/catgory/thriller.jpg'
import  Drama from '../assets/catgory/oppenheimer.jpg'
import MediaCard from "../components/MediaCard";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const CategoryPage = ({ isSidebarOpen }) => {
    const controls = useAnimationControls();
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");
    const { category } = useParams();


    const handelCategoryClick = async (category) => {
        console.log ('Category clicked:', category);
        
          try {
            const response = await axios.get(`http://localhost:4000/api/category/${category}`);
            console.log('Response data:', response.data);
            const { movies, series } = response.data;
            setMovies(movies);
            setSeries(series);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError("Failed to fetch movies and series.");
        }
    };

    const categories = [
        { name: 'Sci-fi', image: Sify },
        { name: 'Adventure', image: Fantasy },
        { name: 'Action', image: Action },
        { name: 'Horror', image: Horror },
        { name: 'War', image: War},
        { name: 'Thriller', image: Thriller },
        { name: 'Fantasy', image: Mom },
        { name: 'Drama', image: Drama },
    ];

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
        className=" px-5 mr-10 mt-10 text-white"
        
      >
        <NavBar />
        
        <div className="flex flex-wrap gap-4 mx-10 -mr-1 mt-10">
        {categories.map((cat, index) => (
           <CategoryCard
             key={index}
             category={cat.name}
             image={cat.image}
             onClick={() => handelCategoryClick(cat.name)}
           />
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-8 mx-10 flex justify-between">
          <p className="text-lg md:text-2xl ">Your Movies</p>
        </div>

        <div className="m-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
          {error && <p>{error}</p>}
            {movies.length === 0 && <p>No movies found for this category.</p>}
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
        <div className="mb-8 mx-10 flex justify-between">
          <p className="text-lg md:text-2xl ">Your Series</p>
        </div>

        <div className="m-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
          {error && <p>{error}</p>}
            {series.length === 0 && <p>No series found for this category.</p>}
            {series.map((series) => (
              <a href="#" key={series._id}>
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

        
      </motion.div>
    
  );
};

export default CategoryPage