
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

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
}

const Dashbord = ({ isSidebarOpen }) => {
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
      className='mx-72 mt-20 text-white'>
      Dashbord
    </motion.div>
  )
}

export default Dashbord;
