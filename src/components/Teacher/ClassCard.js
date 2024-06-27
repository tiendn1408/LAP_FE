import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import classroomBackground from './../../assets/image/classroom-background.jpg';

const ClassCard = ({ classInfo }) => {
    const navigate = useNavigate();
    const image = classroomBackground;
    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDRXFhE3aK7cERNPeEkefjyjTnQCqXLxxIBvi_h77ieGirPLbfO1D7I7km_BFVYFjGIA&usqp=CAU'
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layout
            className='flex flex-col gap-2 bg-white shadow-lg hover:shadow-xl duration-300 w-[250px] h-[200px] rounded-lg'
            onClick={() => {
                navigate(`/class/${classInfo.id}`);
            }}
        >
            <div className='flex justify-center pt-5'>
                <img
                    // classInfo?.classImg ||
                    src={image}
                    alt=''
                    className='rounded-md w-[200px] h-[100px] cursor-pointer'
                ></img>
            </div>
            <div className='flex flex-col ml-6 mr-5'>
                <span className='font-semibold text-lg cursor-pointer truncate'>
                    {classInfo?.className}
                </span>
            </div>
            <div className='flex flex-row justify-between mx-6'>
                <span className='text-sm no-underline cursor-default'>
                    {classInfo?.year}
                </span>
                <span className='text-sm no-underline cursor-default'>
                    Grade{' '}
                    <span className='font-semibold'>{classInfo?.grade}</span>
                </span>
            </div>
        </motion.div>
    );
};

export default ClassCard;
