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
    const handelCategoryClick = (category) => {
        console.log ('Category clicked:', category)
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
             onClick={handelCategoryClick}
           />
        ))}
      </div>

        
      </motion.div>
    
  );
};

export default CategoryPage