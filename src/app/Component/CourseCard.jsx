"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineClockCircle ,  AiOutlineCalendar} from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';


const CourseCard = ({ title, image, time, date, venue }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/Course?title=${encodeURIComponent(title)}`);
  };

  return (
    <div
      className="bg-gray-800 text-gray-200 rounded shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow border-2 border-blue-900"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-400 flex items-center justify-center rounded mb-4">
          <span className="text-gray-400">No Image Available</span>
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-blue-500">{title}</h2>
      <div className="flex items-center space-x-2 mb-2 text-sm">
        <MdLocationOn className="text-red-500" />
        <p className='hover:text-red-500'>{venue}</p>
      </div>
      <div className='flex flex-wrap justify-between pt-1 space-x-2 text-sm '>
      <div className="flex items-center space-x-2 mb-2">
        <AiOutlineClockCircle className="text-yellow-400" />
        <p className='hover:text-yellow-400'>{time}</p>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <AiOutlineCalendar className="text-blue-600" />
        <span className='hover:text-blue-600'>{date}</span>
      </div>
      </div>
    </div>
  );
};

export default CourseCard;
