import React from 'react'

const CategoryCard = ({ category, image, onClick }) => {
  return (
    <div className='catcard relative flex-1 basis-1/4 max-w-1/4 cursor-pointer p-0 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out'
    onClick={() => onClick(category)}
    >
        <img 
        src={image}
        alt={category}
        className='w-full h-40 object-cover rounded-md'
        />
       <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg'>
        <h3 className='text-center text-xl font-semibold text-white'>{category}</h3>
      </div>
    </div>
    
  );
};

export default CategoryCard;