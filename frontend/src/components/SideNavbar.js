import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavigationLink from './NavigationLink';
import SettingsNav from './SettingsNav';
import { Link } from 'react-router-dom';
import { UilEstate, UilCompass, UilHeartAlt, UilSchedule, UilPanoramaHAlt, UilSetting, } from '@iconscout/react-unicons';

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "17rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
}

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
    marginLeft: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const SideNavbar = ({ setIsSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(true);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
    setIsSidebarOpen(isOpen);
  }, [isOpen, containerControls, svgControls, setIsSidebarOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="bg-neutral-900 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-full shadow shadow-neutral-600"
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <button className='p-1 rounded-full flex' onClick={handleOpenClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-8 h-8 stroke-neutral-200"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              variants={svgVariants}
              animate={svgControls}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </svg>
        </button>
      </div>
      
      <div className='flex flex-col gap-3 -mx-2 md:mt-5 lg:mt-5'>
        <NavigationLink to="/" name="Home">
          <UilEstate className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-7" />
        </NavigationLink>
        <NavigationLink to="/discover" name="Discover">
          <UilCompass className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-7" />
        </NavigationLink>
        <NavigationLink to="/watch" name="Watch list">
          <UilHeartAlt className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-7" />
        </NavigationLink>
        <NavigationLink to="/watch" name="Coming Soon">
          <UilSchedule className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-7" />
        </NavigationLink>
        <NavigationLink name="Categories">
          <UilPanoramaHAlt className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
        </NavigationLink>
        <SettingsNav settings="Settings">
          <UilSetting className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
        </SettingsNav>
      </div>
    </motion.nav>
  );
};

export default SideNavbar;
