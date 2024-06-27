import React, { useState, useEffect, useRef } from 'react';
import Button from '../../Button';
import { v4 as uuidv4 } from 'uuid';

const MultiSelect = ({ answers, setAnswers }) => {
    const [newAnswer, setNewAnswer] = useState([]);
    const count = useRef(answers?.multiSelect?.length < 2 ? 0 : answers?.multiSelect?.length);
    const preAnswer = useRef();

    const handleOnChangeIsTrue = (i) => {
        const inputData = [...newAnswer];
        inputData[i].isTrue = !inputData[i].isTrue;
        setNewAnswer(inputData);
    };

    const handleOnChangeAnswer = (onChangeValue, i) => {
        const inputData = [...newAnswer];
        inputData[i].answer = onChangeValue.target.value;
        setNewAnswer(inputData);
    };

    const handleAddAnswers = () => {
        const newAnswers = [...newAnswer, { id: uuidv4(), isTrue: false, answer: '' }];
        count.current++;
        setNewAnswer(newAnswers);
    };

    const handleDelete = (id) => {
        const newList = newAnswer.filter((item) => item.id !== id);
        count.current--;
        setNewAnswer(newList);
    };

    useEffect(() => {
        if (answers?.multiSelect?.length > 0 && newAnswer !== answers?.multiSelect) {
            preAnswer.current = newAnswer;
            const listAnswer = [];
            for (let i = 0; i < answers?.multiSelect?.length; i++) {
                if (answers?.multiSelect[i].id) {
                    listAnswer.push({ ...answers?.multiSelect[i], id: uuidv4() });
                }
            }
            setNewAnswer(listAnswer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers]);

    useEffect(() => {
        if (
            newAnswer.length > 0 &&
            newAnswer !== answers?.multiSelect &&
            preAnswer.current !== newAnswer
        ) {
            setAnswers({ ...answers, multiSelect: newAnswer });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newAnswer]);

    return (
        <div className='flex flex-col gap-5 justify-center items-center'>
            {newAnswer?.map((val, i) => {
                return (
                    <div key={val?.id} className='flex flex-row gap-3'>
                        <div className='flex flex-row  gap-2 items-center px-5 py-3 pt-4 rounded-md w-[500px]'>
                            <input
                                type='checkbox'
                                defaultChecked={val.isTrue}
                                onChange={() => handleOnChangeIsTrue(i)}
                            />
                            <input
                                placeholder='Enter answers'
                                value={val?.answer}
                                onChange={(e) => handleOnChangeAnswer(e, i)}
                                className='outline-none w-full px-2 py-1 border-b duration-300 border-gray-200'
                            />
                        </div>
                        <div className='flex items-center'>
                            <i
                                className='fas fa-times text-xl cursor-pointer text-gray-500 hover:text-red-400 duration-300'
                                onClick={() => handleDelete(val?.id)}
                            ></i>
                        </div>
                    </div>
                );
            })}
            <div className=''>
                {count.current === 6 ? (
                    <></>
                ) : (
                    <Button className='border-none text-2xl' onClick={handleAddAnswers}>
                        +
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
