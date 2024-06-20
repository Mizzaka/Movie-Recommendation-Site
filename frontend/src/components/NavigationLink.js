

const NavigationLink = ({children, name}) => {
    return (
        <a href="#" className="felx p-3 rounded cursor-pointer stroke[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700 transition-colors duration-100 ">
         {children}
         <p className="text-inherit mx-12 -mt-6 font-poppins overflow-clip whitespace-nowrap tracking-wide ">
            {name}
         </p>
        
        </a>

        

        
    )
}

export default NavigationLink;