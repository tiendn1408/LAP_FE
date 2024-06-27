import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { API_URL } from '../constant';
import Button from '../components/Button';
// import MultiChoice from '../components/Teacher/AnswerType/MultiChoice';
// import TrueFalse from '../components/Teacher/AnswerType/TrueFalse';
import MultiChoiceAnswer from '../components/Student/MultiChoiceAnswer';
import TrueFalseAnswer from '../components/Student/TrueFalseAnswer';
import MultiSelectAnswers from '../components/Student/MultiSelectAnswers';
import InputAnswer from '../components/Teacher/AnswerType/InputAnswer';
import TokenExpire from '../components/Modals/TokenExpire';
import ConfirmModal from '../components/Modals/ConfirmModal';

import createAxiosJWT from '../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const AnswerQuestion = () => {
    const navigate = useNavigate();
    const { assignmentId, questionIndex } = useParams();
    //   const [countdown, setCountdown] = useState()
    const [isExpired, setIsExpired] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [currentQuestionId, setCurrentQuestionId] = useState();
    const [listQuestionOfAssignment, setListQuestionOfAssignment] = useState([]);
    const [answers, setAnswers] = useState();

    const checkStudentAnswered = (questionOfAssignment) => {
        const questionType = ['', 'multiChoice', 'trueFalse', 'input', 'multiSelect'];
        const answerOfStudent = questionOfAssignment?.answerOfStudent?.answer;
        const typeOfquestion =
            questionOfAssignment?.questionTypeId &&
            questionType[questionOfAssignment?.questionTypeId];
        if (answerOfStudent && typeOfquestion && answerOfStudent[typeOfquestion]) {
            const resultOfStudent = answerOfStudent[typeOfquestion];
            if (typeOfquestion === 'multiChoice')
                for (let i = 0; i < resultOfStudent.length; i++)
                    if (resultOfStudent[i].isTrue) return true;
            if (typeOfquestion === 'trueFalse')
                for (let i = 0; i < resultOfStudent.length; i++)
                    if (resultOfStudent[i].isTrue) return true;
            if (typeOfquestion === 'input' && resultOfStudent[0].answer.length > 0) return true;
            if (typeOfquestion === 'multiSelect')
                for (let i = 0; i < resultOfStudent.length; i++)
                    if (resultOfStudent[i].isTrue) return true;
        }
        return false;
    };

    const handleSaveAnswer = async () => {
        try {
            await axiosJWT.put(
                API_URL + `student-question/${currentQuestion?.answerOfStudent.studentQuestionId}`,
                {
                    answer: answers,
                }
            );
            if (currentQuestion?.index < listQuestionOfAssignment.length - 1)
                handleQuestionOfAssignmentForStudent(currentQuestion?.index + 1);
            else {
                handleQuestionOfAssignmentForStudent(currentQuestion?.index);
                setIsConfirm(true);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleQuestionOfAssignmentForStudent = useCallback(
        async (index) => {
            try {
                const questionIdx = index || 0;
                const res = await axiosJWT.get(
                    API_URL + `student-question/assignment/${assignmentId}`
                );
                const questionsOfAssignment = res.data;
                for (let i = 0; i < questionsOfAssignment.length; i++)
                    questionsOfAssignment[i].index = i;
                if (questionsOfAssignment && questionsOfAssignment.length > 0) {
                    setListQuestionOfAssignment(questionsOfAssignment);
                    setCurrentQuestionId(questionsOfAssignment[questionIdx]?.id);
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) setIsExpired(true);
            }
        },
        [assignmentId]
    );

    const handleSubmitAssignmet = async () => {
        await axiosJWT.put(
            API_URL + `student-question/${currentQuestion?.answerOfStudent.studentQuestionId}`,
            {
                answer: answers,
            }
        );

        handleQuestionOfAssignmentForStudent(currentQuestion?.index);
        setIsConfirm(true);
    };

    const handleConfirmSubmitAssignmet = async () => {
        navigate(`/assignment/${assignmentId}/result`);
    };

    useEffect(() => {
        handleQuestionOfAssignmentForStudent();
    }, [handleQuestionOfAssignmentForStudent]);

    useEffect(() => {
        setCurrentQuestion(
            listQuestionOfAssignment.find(
                (questionOfAssignment) => questionOfAssignment.id === currentQuestionId
            )
        );
    }, [currentQuestionId, listQuestionOfAssignment]);

    useEffect(() => {
        if (currentQuestion)
            setAnswers(
                currentQuestion.answerOfStudent?.answer
                    ? {
                          multiChoice: currentQuestion.answerOfStudent?.answer?.multiChoice?.map(
                              (multiChoice, i) => ({
                                  isTrue: multiChoice?.isTrue,
                                  answer: currentQuestion.contentQuestion?.multiChoice[i]?.answer,
                              })
                          ),
                          multiSelect: currentQuestion.answerOfStudent?.answer?.multiSelect?.map(
                              (multiSelect, i) => ({
                                  isTrue: multiSelect?.isTrue,
                                  answer: currentQuestion.contentQuestion?.multiSelect[i]?.answer,
                              })
                          ),
                          input: currentQuestion.answerOfStudent?.answer?.input,
                          trueFalse: currentQuestion.answerOfStudent?.answer?.trueFalse?.map(
                              (trueFalse, i) => ({
                                  isTrue: trueFalse?.isTrue,
                                  answer: currentQuestion.contentQuestion?.trueFalse[i]?.answer,
                              })
                          ),
                      }
                    : {
                          multiChoice: currentQuestion.contentQuestion?.multiChoice?.map(
                              (multiChoice) => ({
                                  isTrue: false,
                                  answer: multiChoice.answer,
                              })
                          ),
                          multiSelect: currentQuestion.contentQuestion?.multiSelect?.map(
                              (multiSelect) => ({
                                  isTrue: false,
                                  answer: multiSelect.answer,
                              })
                          ),
                          input: [{ answer: '' }],
                          trueFalse: currentQuestion.contentQuestion?.trueFalse?.map(
                              (trueFalse) => ({
                                  isTrue: false,
                                  answer: trueFalse.answer,
                              })
                          ),
                      }
            );
    }, [currentQuestion]);

    // useEffect(() => {
    //     listQuestionOfAssignment &&
    //         setCurrentQuestionId(listQuestionOfAssignment[questionIndex - 1]?.id);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [questionIndex, listQuestionOfAssignment]);

    const renderAnswer = (questionTypeId) => {
        switch (questionTypeId) {
            case 1:
                return answers && <MultiChoiceAnswer answers={answers} setAnswers={setAnswers} />;
            // contentQuestion.multiChoice = contentQuestion?.multiChoice.map((multiChoice) => ({
            //     isTrue: false,
            //     answer: multiChoice.answer,
            // }));
            case 2:
                return answers && <TrueFalseAnswer answers={answers} setAnswers={setAnswers} />;
            // contentQuestion.trueFalse = contentQuestion?.trueFalse.map((trueFalse) => ({
            //     isTrue: false,
            //     answer: trueFalse.answer,
            // }));
            case 3:
                return answers && <InputAnswer answers={answers} setAnswers={setAnswers} />;
            // <textarea
            //     placeholder='Enter the answer...'
            //     className='outline-primary resize-none transition-all border-2 border-gray-500 px-5 py-2 rounded-md w-[100%]'
            // ></textarea>
            case 4:
                return answers && <MultiSelectAnswers answers={answers} setAnswers={setAnswers} />;
            default:
                return <div>404</div>;
        }
    };

    return (
        <div className='flex flex-col px-10 gap-5 py-7'>
            <h2 className='font-semibold font-inter px-3 text-xl'>Assignment name</h2>
            <div className='flex flex-row gap-5 h-[full] w-full'>
                {/* right */}
                <div className='flex flex-col w-[65%] gap-5'>
                    <div className='w-full bg-white shadow rounded-lg px-12 pt-7 pb-5 flex flex-col gap-5 text-justify'>
                        <div className='flex'>
                            <h2 className='font-semibold font-inter text-primary rounded-lg text-xl'>
                                Question - {currentQuestion?.index + 1}
                            </h2>
                        </div>
                        {/* problem */}
                        <span>{currentQuestion?.content}</span>
                        {/* answer */}
                        <div className=''>{renderAnswer(currentQuestion?.questionTypeId)}</div>
                        {/* Next */}
                        <div className='flex flex-row-reverse'>
                            <Button className='border-none' onClick={handleSaveAnswer}>
                                {currentQuestion?.index === listQuestionOfAssignment.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* left */}
                <div className='flex flex-col gap-5 w-[35%]'>
                    <div className='flex flex-col h-[450px] pt-7 px-5 pb-5 items-center bg-white justify-between rounded-lg shadow'>
                        <div className='flex flex-col items-center gap-3 h-full '>
                            <span className='font-semibold text-2xl text-primary'>01 : 10</span>
                            <div className='flex flex-wrap gap-5 max-h-[300px] px-5 overflow-y-auto py-3'>
                                {listQuestionOfAssignment.map((questionOfAssignment, i) => {
                                    return (
                                        <div
                                            key={questionOfAssignment.id}
                                            className='h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-500 hover:outline-green-500 rounded overflow-hidden transition-all cursor-pointer select-none'
                                            onClick={() =>
                                                setCurrentQuestionId(questionOfAssignment.id)
                                            }
                                        >
                                            <div className='flex justify-center items-center'>
                                                <span>{i + 1}</span>
                                            </div>
                                            {checkStudentAnswered(questionOfAssignment) && (
                                                <div className='text-white flex w-full h-full items-center justify-center bg-primary'></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Button className='border-none w-[70%]' onClick={handleSubmitAssignmet}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <TokenExpire isOpen={isExpired} />
            <ConfirmModal
                isOpen={isConfirm}
                message='Do you want submit assignment?'
                yesConfirm={handleConfirmSubmitAssignmet}
                noConfirm={() => setIsConfirm(false)}
            />
        </div>
    );
};

export default AnswerQuestion;
