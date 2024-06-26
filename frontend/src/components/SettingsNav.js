import React from 'react'

const SettingsNav = ({children, settings }) => {
  return (
    <a href="#" className="felx p-3 mt-32 rounded cursor-pointer stroke[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700 transition-colors duration-100 ">
         {children}
         <p className="text-inherit mx-10 -mt-6 font-poppins overflow-clip whitespace-nowrap tracking-wide ">
            {settings}
         </p>
        
        </a>
  )
}

export default SettingsNav