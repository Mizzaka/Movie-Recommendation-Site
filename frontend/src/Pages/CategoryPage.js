import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Int from "../assets/int.jpg";

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
        { name: 'Action', image: Int },
        { name: 'Horror', image: Int },
        { name: 'Fantasy', image: Int },
        { name: 'Sci-fi', image: Int },
        { name: 'Sci-fi', image: Int },
        { name: 'Sci-fi', image: Int },
        { name: 'Sci-fi', image: Int },
        { name: 'Sci-fi', image: Int },
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
        
        
        <div className="flex flex-wrap gap-4 mx-20 mt-10">
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