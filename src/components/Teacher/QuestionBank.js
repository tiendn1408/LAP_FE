import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';

import Table from '../Table';
import { API_URL } from '../../constant';
import MultiChoice from './AnswerType/MultiChoice';
import TrueFalse from './AnswerType/TrueFalse';
import InputAnswer from './AnswerType/InputAnswer';
import MultiSelect from './AnswerType/MultiSelect';

const QuestionBank = ({ questionsBank, onUpdateQuestionBank, onCloseModalBank }) => {
    const thead = [
        {
            width: '40%',
            'max-width': '200px',
            title: 'CONTENT',
        },
        {
            width: '30%',
            title: 'SKILLS',
        },
        {
            width: '15%',
            title: 'TOPIC',
        },
        {
            width: '10%',
            title: 'GRADE',
        },
        {
            width: '10%',
            title: 'SCORE',
        },
    ];
    const Selectoptions = [
        { value: 1, label: 'Multi Choice' },
        { value: 2, label: 'True False' },
        { value: 3, label: 'Input' },
        { value: 4, label: 'Multi Select' },
    ];
    const levelOption = [
        { value: '', label: 'All Levels' },
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    // debugger
    const [bank, setBank] = useState([]);
    const [viewBank, setViewBank] = useState([]);
    const [valueQuestionBank, setValueQuestionBank] = useState([]);
    const [checked, setChecked] = useState([]);
    const [questionBank, setQuestionBank] = useState([]);
    const [questionsConfirm, setQuestionsConfirm] = useState([]);

    const [grades, setGrades] = useState([]);
    const [currentGrade, setCurrentGrade] = useState('');
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [currentLevel, setCurrentLevel] = useState('');

    const [currentQuestion, setCurrentQuestion] = useState('');
    const [questionBankContent, setQuestionBankContent] = useState('');
    const [enableHitQuestionBank, setEnableHitQuestionBank] = useState(false);
    const [hintQuestionBank, setHintQuestionBank] = useState(false);
    const [optionQuestionBank, setOptionQuestionBank] = useState({
        multiChoice: [
            { isTrue: false, answers: '' },
            { isTrue: false, answers: '' },
            { isTrue: false, answers: '' },
            { isTrue: false, answers: '' },
        ],
        multiSelect: [],
        input: [],
        trueFalse: [],
    });
    const [selectedOptionType, setSelectedOptionType] = useState({});
    const [score, setScore] = useState(0);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [level, setLevel] = useState('');

    const bankFormula = useRef();

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        const newOffset = (event.selected * 5) % bank.length;
        setItemOffset(newOffset);
    };

    const [modalConfirmQuestionIsOpen, setConfirmQuestionIsOpen] = React.useState(false);

    const [searchParam, setSearchParam] = useState('');
    const handleOpenConfirmQuestion = () => {
        const questionChecked = questionBank.map((question) => {
            return {
                id: question.id,
                content: question.content,
                skills: question.skillName,
                topic: question.topicName,
                grade: question.gradeName,
                score: question.score,
            };
        });
        setQuestionsConfirm(questionChecked);
        setConfirmQuestionIsOpen(true);
    };

    const handleCloseConfirmQuestion = () => {
        setQuestionsConfirm([]);
        setConfirmQuestionIsOpen(false);
    };

    const handleConfirmQuestionBank = () => {
        onUpdateQuestionBank(questionBank);
        onCloseModalBank();

        handleCloseConfirmQuestion();
    };

    const handleClickQuestionBank = (id) => {
        setChecked((prev) => {
            const isChecked = prev.includes(id);
            if (isChecked) {
                setQuestionBank((prevQuestions) => {
                    return prevQuestions.filter((question) => {
                        return question.id !== id;
                    });
                });
                if (id === currentQuestion) handleReviewQuestionBank();
                return prev.filter((item) => item !== id);
            }
            setQuestionBank((prevQuestions) => {
                const question = valueQuestionBank.filter(
                    (questionInBank) => questionInBank.id === id
                );
                handleReviewQuestionBank(...question);
                return [...prevQuestions, ...question];
            });
            return [...prev, id];
        });
    };

    const handleReviewQuestionBank = (data) => {
        setCurrentQuestion(data?.id || '');
        setQuestionBankContent(data?.content || '');
        setEnableHitQuestionBank(!!data?.hint);
        setHintQuestionBank(data?.hint || '');
        setOptionQuestionBank(
            data?.option || {
                multiChoice: [
                    { isTrue: false, answers: '' },
                    { isTrue: false, answers: '' },
                    { isTrue: false, answers: '' },
                    { isTrue: false, answers: '' },
                ],
                multiSelect: [],
                input: [],
                trueFalse: [],
            }
        );
        setLevel(data?.level || '');
        setSelectedOptionType(Selectoptions[data?.questionTypeId - 1] || '');
        setScore(data?.score || 0);
    };

    const convertResToOption = (value, label) => {
        return {
            value: value,
            label: label,
        };
    };

    const getQuestionBank = (gradeId, topicId, skillId, level) => {
        axios
            .get(
                API_URL +
                    `question/question-bank?gradeId=${gradeId}&topicId=${topicId}&skillId=${skillId}&level=${level}`
            )
            .then((res) => {
                const bank = res.data;
                const questions = [];
                for (let i = 0; i < bank.length; ++i) {
                    questions.push({
                        id: bank[i].id,
                        content: bank[i].content,
                        skills: bank[i].skillName,
                        topic: bank[i].topicName,
                        grade: bank[i].gradeName,
                        score: bank[i].score,
                    });
                }
                setBank(questions);
                setValueQuestionBank(bank);
                setCurrentPage(bank.length > 0 ? 1 : 0);
            });
    };

    const getAllGrades = () => {
        axios.get(API_URL + `grade`).then((res) => {
            const grades = res.data;
            const option = [];
            option.push({
                value: '',
                label: 'All Grades',
            });
            for (let i = 0; i < grades.length; i++)
                option.push(convertResToOption(grades[i].id, grades[i].gradeName));
            setGrades(option);
        });
    };

    const getAllTopics = () => {
        axios.get(API_URL + `topic`).then((res) => {
            const topics = res.data;
            const option = [];
            option.push({
                value: '',
                label: 'All Topics',
            });
            for (let i = 0; i < topics.length; i++)
                option.push(convertResToOption(topics[i].id, topics[i].topicName));
            setTopics(option);
        });
    };

    const getAllSkills = () => {
        axios.get(API_URL + `skill`).then((res) => {
            const skills = res.data;
            const option = [];
            option.push({
                value: '',
                label: 'All Skills',
            });
            for (let i = 0; i < skills.length; i++)
                option.push(convertResToOption(skills[i].id, skills[i].skillName));
            setSkills(option);
        });
    };

    useEffect(() => {
        getAllGrades();
        getAllTopics();
        getAllSkills();
        if (questionsBank) {
            setQuestionBank(questionsBank);
            for (let i = 0; i < questionsBank.length; i++) {
                handleClickQuestionBank(questionsBank[i].id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getQuestionBank(currentGrade, currentTopic, currentSkill, currentLevel);
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, [currentGrade, currentTopic, currentSkill, currentLevel]);

    useEffect(() => {
        bankFormula.current.setValue(questionBankContent || '');
    }, [questionBankContent]);

    useEffect(() => {
        const endOffset = itemOffset + 5;
        const filteredBank = bank.filter((val) => {
            if (searchParam === '' || val.content.toLowerCase().includes(searchParam.toLowerCase()))
                return val;
            return '';
        });
        setViewBank(filteredBank.slice(itemOffset, endOffset));
        // setViewBank(bank.filter);
        console.log(Math.ceil(filteredBank.length / 5));
        setPageCount(Math.ceil(filteredBank.length / 5));
    }, [itemOffset, bank, searchParam]);

    return (
        <div className='px-8 h-full relative'>
            <i
                className='fas fa-times text-2xl right-[8px] absolute cursor-pointer'
                onClick={onCloseModalBank}
            ></i>

            <div className='flex flex-row justify-between pt-8 h-full w-full'>
                <div className='w-[40%] flex flex-col justify-between'>
                    <div className='flex flex-row gap-7'>
                        <span className='text-xl font-medium flex gap-2 min-w-[160px]'>
                            Level :
                            <span
                                className={` ${
                                    level === 'Hard'
                                        ? `text-red-400`
                                        : level === 'Medium'
                                        ? `text-yellow-400`
                                        : 'text-green-400'
                                } `}
                            >
                                {level}
                            </span>
                        </span>
                        <span className='flex text-xl font-medium gap-2'>
                            Score:
                            <div className='flex font-normal'>
                                <div className='flex justify-end min-w-[32px]'>{score || 0}</div>
                                <span>.pt</span>
                            </div>
                        </span>
                    </div>
                    <math-field
                        id='Bank-modal-formula'
                        ref={bankFormula}
                        style={{
                            whiteSpace: 'initial',
                            fontSize: '20px',
                            outline: 'none',
                            padding: '0.5rem 1.5rem',
                            userSelect: 'none',
                            width: '100%',
                            maxHeight: '150px',
                            overflowWrap: 'break-word',
                            fontFamily: 'Poppins',
                        }}
                        readonly
                    ></math-field>
                    {/* <input
                        type='text'
                        placeholder='Hello'
                        onChange={(e) => setTest(e.target.value)}
                    /> */}

                    <motion.div
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='duration-300 h-[48px]'
                    >
                        {enableHitQuestionBank && (
                            <div className='px-6 py-3 text-white flex flex-row gap-4 items-center bg-primary rounded-md overflow-hidden w-full break-words'>
                                <i className='far fa-lightbulb'></i>
                                <span className=' whitespace-pre-line'>
                                    {hintQuestionBank ? hintQuestionBank : 'Hint'}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    <div className='my-10'>
                        {selectedOptionType?.value === 1 ? (
                            <MultiChoice
                                setAnswers={setOptionQuestionBank}
                                answers={optionQuestionBank}
                                questionType={selectedOptionType}
                            />
                        ) : selectedOptionType?.value === 2 ? (
                            <TrueFalse
                                setAnswers={setOptionQuestionBank}
                                answers={optionQuestionBank}
                                questionType={selectedOptionType}
                            />
                        ) : selectedOptionType?.value === 3 ? (
                            <InputAnswer
                                setAnswers={setOptionQuestionBank}
                                answers={optionQuestionBank}
                                questionType={selectedOptionType}
                            />
                        ) : selectedOptionType?.value === 4 ? (
                            <MultiSelect
                                setAnswers={setOptionQuestionBank}
                                answers={optionQuestionBank}
                                questionType={selectedOptionType}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-[58%] h-full'>
                    <div className='flex flex-col h-[152px] justify-center align-center'>
                        <div className='flex flex-col w-full items-center px-[4px] pb-[4px]'>
                            <div className='flex justify-between w-full px-[4px] pb-[4px]'>
                                <Select
                                    className='w-[48%]'
                                    options={grades}
                                    placeholder='Grade'
                                    onChange={(e) => setCurrentGrade(e.value)}
                                />
                                <Select
                                    className='w-[48%]'
                                    options={topics}
                                    placeholder='Topic'
                                    onChange={(e) => setCurrentTopic(e.value)}
                                />
                            </div>
                            <div className='flex justify-between w-full p-[4px]'>
                                <Select
                                    className='w-[48%]'
                                    options={levelOption}
                                    placeholder='Level'
                                    onChange={(e) => setCurrentLevel(e.value)}
                                />
                                <Select
                                    className='w-[48%]'
                                    options={skills}
                                    placeholder='Skill'
                                    onChange={(e) => setCurrentSkill(e.value)}
                                />
                            </div>
                        </div>
                        <div className='w-full px-[8px] pb-[4px]'>
                            <div className='flex justify-center'>
                                <div className='flex flex-row w-full'>
                                    <input
                                        type='search'
                                        onChange={(e) => setSearchParam(e.target.value)}
                                        id='search-dropdown'
                                        className='block p-2.5 w-full outline-primary transition-all text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 '
                                        placeholder='Search question'
                                        required=''
                                    />
                                    <button className='top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                                        <i className='fa fa-search' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grow'>
                        <div className='flex flex-col justify-between mb-[40px] h-[100%]'>
                            <div className='grow'>
                                <Table
                                    checkboxTable={true}
                                    thead={thead}
                                    tbody={viewBank}
                                    actions={[]}
                                    customCssTr='cursor-pointer'
                                    onClickTh={handleClickQuestionBank}
                                    checked={checked}
                                />
                            </div>
                            <div className='flex justify-between p-4'>
                                <span className='font-sm text-gray-500'>
                                    Page {currentPage} / {pageCount}
                                </span>
                                <ReactPaginate
                                    breakLabel='...'
                                    nextLabel={
                                        <button>
                                            Next <i className='fas fa-angle-right'></i>
                                        </button>
                                    }
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    previousLabel={
                                        <button>
                                            <i className='fas fa-angle-left'></i> Previous
                                        </button>
                                    }
                                    renderOnZeroPageCount={null}
                                    className='flex flex-row text-gray-500 gap-7 justify-center font-semibold items-center'
                                    activeClassName='bg-primary text-white flex justify-center items-center w-8 h-8 rounded-full shadow-lg'
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleOpenConfirmQuestion}>Save Questions</button>
                        <Modal
                            isOpen={modalConfirmQuestionIsOpen}
                            style={{
                                top: '0',
                                left: '0',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            contentLabel='Example Modal'
                            ariaHideApp={false}
                        >
                            <div className='h-full px-[20px] relative'>
                                {/* <i
                                    className='fas fa-times text-2xl right-[8px] absolute'
                                    onClick={handleCloseConfirmQuestion}
                                ></i> */}
                                <div className='flex flex-col justify-between pt-8 h-full'>
                                    <div className=''>
                                        <span>Do you want add these questions?</span>
                                        <Table
                                            checkboxTable={false}
                                            thead={thead}
                                            tbody={questionsConfirm}
                                            actions={[]}
                                            onClickTh={handleClickQuestionBank}
                                            checked={checked}
                                        />
                                    </div>
                                    <div className='flex justify-between self-center w-64 mb-4'>
                                        <button onClick={handleCloseConfirmQuestion}>Cancel</button>
                                        <button onClick={handleConfirmQuestionBank}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionBank;
