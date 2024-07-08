import React from 'react'

const CategoryCard = ({ category, image, onClick }) => {
  return (
    <div className='catcard relative flex-1 basis-1/4 max-w-1/4 cursor-pointer p-0  hover:shadow-2xl transition-shadow duration-300 ease-in-out'
    onClick={() => onClick(category)}
    >
        <img 
        src={image}
        alt={category}
        className='w-full h-40 object-cover '
        />
       <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-75 duration-300 ease-in-out '>
        <h3 className='text-center text-2xl font-semibold text-gray-300 hover:text-primary'>{category}</h3>
      </div>
    </div>
    
  );
};

export default CategoryCard;