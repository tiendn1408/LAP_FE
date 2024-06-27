import React, { useState, useEffect } from 'react';
import CustomCheckbox from '../CustomeCheckbox';

const MultiSelectAnswers = ({ answers, setAnswers }) => {
    const [answerSelect, setAnswerSelect] = useState([]);
    const handleOnChangeIsTrue = (answer) => {
        const indexAnswer = answerSelect.findIndex((option) => option.answer === answer);
        if (indexAnswer !== -1) {
            answerSelect[indexAnswer].isTrue = !answerSelect[indexAnswer].isTrue;
            setAnswerSelect(answerSelect);
            setAnswers({ ...answers, multiSelect: answerSelect });
        }
    };

    useEffect(() => {
        if (answers.multiSelect?.length > 0) setAnswerSelect(answers.multiSelect);
    }, [answers]);

    return (
        <div className='flex flex-col items-center gap-5'>
            {answers?.multiSelect?.map((item, i) => {
                return (
                    <CustomCheckbox
                        key={item.isTrue + item.answer + i}
                        item={item}
                        onClickCheckbox={handleOnChangeIsTrue}
                    />
                );
            })}
        </div>
    );
};

export default MultiSelectAnswers;
