import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';

const TrueFalse = ({ answers, setAnswers }) => {
    const [value, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    const trueAnswer = answers?.trueFalse?.findIndex((element) => element.isTrue === true);
    const convert = useMemo(
        () => ({
            0: 'True',
            1: 'False',
        }),
        []
    );

    useEffect(() => {
        if (answers?.trueFalse?.find((element) => element.answer === 'True')) {
            setValue(convert[`${trueAnswer}`]);
        }
        // if (convert[trueAnswer] !== value) {
        //   setValue(convert[`${trueAnswer}`])
        // }
    }, [answers, convert, trueAnswer]);

    useEffect(() => {
        if (value && convert[trueAnswer] !== value) {
            setAnswers({
                ...answers,
                trueFalse: [
                    { isTrue: value === 'True' ? true : false, answer: 'True' },
                    { isTrue: value === 'False' ? true : false, answer: 'False' },
                ],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className='w-full'>
            <div className='hidden' onChange={handleOnChange}>
                <input type='radio' name='right-answer' value='True' id='option-True' />
                <input type='radio' name='right-answer' value='False' id='option-False' />
            </div>
            <div className='grid grid-cols-2 gap-5 my-5 ' onChange={handleOnChange}>
                <label
                    htmlFor='option-True'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center cursor-pointer select-none justify-between'
                >
                    <span className=' text-white outline-none bg-primary placeholder-gray-100 select-none'>
                        True
                    </span>
                    {value === 'True' ? (
                        <div className='w-[20px] h-[20px] rounded-full bg-green-400 text-white  flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[20px] h-[20px] rounded-full border-2  cursor-pointer'></div>
                    )}
                </label>
                <label
                    htmlFor='option-False'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center select-none cursor-pointer  justify-between'
                >
                    <span className=' text-white outline-none bg-primary placeholder-gray-100 select-none'>
                        False
                    </span>
                    {value === 'False' ? (
                        <div className='w-[20px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[20px] h-[20px] rounded-full border-2 '></div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default TrueFalse;
