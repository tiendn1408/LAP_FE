import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Button from '../../components/Button';
import StudentCard from '../../components/Teacher/StudentCard';
import CustomProgressBar from '../../components/CustomProgressBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import achievementImg from '../../assets/image/achievement.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import axios from 'axios';
import { API_URL } from '../../constant';
import moment from 'moment';
import Modal from 'react-modal';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(165, 165, 165, 0.6)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
    },
};

const TeacherManageStudents = () => {
    const [averageScore, setAverageScore] = useState(0);
    const [filterStudent, setFilterStudent] = useState('All');
    const [filteredStudentList, setFilteredStudentList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [studentInfo, setStudentInfo] = useState({});
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [addStatus, setAddStatus] = useState('');
    const studentEmail = useRef();

    const { classId } = useParams();
    const toggleModal = () => {
        setAddStudentModal(!addStudentModal);
    };

    const handleGetStudentOfClass = useCallback(() => {
        axiosJWT
            .get(API_URL + `student/class/${classId}`)
            .then((res) => {
                setStudentList(res.data);
                setStudentInfo(res.data[0]);
                setFilteredStudentList(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [classId]);

    const handleScoreFilter = (filterStudent) => {
        if (filterStudent === 'All') {
            setFilteredStudentList(studentList);
        }

        if (filterStudent === 'Good') {
            setFilteredStudentList(studentList.filter((student) => student?.averageScore > 50));
        }

        if (filterStudent === 'Below Average') {
            setFilteredStudentList(studentList.filter((student) => student?.averageScore < 50));
        }
    };

    const handleAddStudent = async () => {
        await axiosJWT
            .post(API_URL + `student/class/${classId}`, {
                studentEmail: studentEmail.current.value,
            })
            .then((res) => {
                setStudentList(res.data);
                setStudentInfo(res.data[0]);
                setAddStatus(res.data.text);
                if (res.data.text === 'Ok') {
                    toggleModal();
                }
                handleGetStudentOfClass();
            })
            .catch((err) => console.log(err, 'hehe'));
        // window.location.reload()
    };

    useEffect(() => {
        handleGetStudentOfClass();
    }, [handleGetStudentOfClass]);

    useEffect(() => {
        setAverageScore(studentInfo?.averageScore);
    }, [studentInfo]);

    return (
        <div className='flex flex-row h-screen'>
            {/* left */}
            <div className='w-[40%] flex flex-col px-10 py-5 gap-6'>
                <div className='flex flex-row justify-between items-center px-4'>
                    {/* search */}
                    <span className='text-2xl font-medium'>Students</span>
                    <input
                        className='outline-none rounded-lg text-base px-4 py-2 drop-shadow-md focus:drop-shadow-lg transition-all'
                        placeholder='Search'
                    />
                </div>
                {/* filter */}
                <div className='flex flex-row justify-between items-center pl-6 pr-4 text-lg'>
                    <div className='flex flex-row h-[30px] gap-5 items-center'>
                        <span
                            onClick={() => {
                                setFilterStudent('All');
                                handleScoreFilter('All');
                            }}
                            className={`cursor-pointer transition-all ${
                                filterStudent === 'All' ? 'font-medium ' : 'text-base'
                            }`}
                        >
                            All
                        </span>
                        <span
                            onClick={() => {
                                setFilterStudent('Good');
                                handleScoreFilter('Good');
                            }}
                            className={`cursor-pointer transition-all ${
                                filterStudent === 'Good' ? 'font-medium ' : 'text-base'
                            }`}
                        >
                            Good
                        </span>
                        <span
                            onClick={() => {
                                setFilterStudent('Below Average');
                                handleScoreFilter('Below Average');
                            }}
                            className={`cursor-pointer transition-all ${
                                filterStudent === 'Below Average' ? 'font-medium ' : 'text-base'
                            }`}
                        >
                            Below Average
                        </span>
                    </div>
                    <div>
                        <Button className='text-xs border-none' onClick={toggleModal}>
                            Add a student
                        </Button>
                        <Modal
                            isOpen={addStudentModal}
                            onRequestClose={toggleModal}
                            style={customStyles}
                            ariaHideApp={false}
                        >
                            <div className='w-[500px] h-[200px] flex flex-col relative'>
                                <div
                                    className='absolute text-xl cursor-pointer translate-x-[490px] -translate-y-[10px]'
                                    onClick={toggleModal}
                                >
                                    <i className='fas fa-times text-gray-700'></i>
                                </div>
                                <div className='flex flex-col justify-between gap-5 h-full'>
                                    {/* title */}
                                    <div>
                                        <span className='text-2xl font-medium'>Add a student</span>
                                    </div>
                                    {/* username */}
                                    <div className='flex flex-col gap-3'>
                                        {addStatus === 'No ok' && (
                                            <span className='text-red-500'>Can't add student.</span>
                                        )}
                                        <input
                                            ref={studentEmail}
                                            type='text'
                                            placeholder='Type in student email'
                                            className='w-full outline-none border transition-all focus:border-primary rounded p-2'
                                        />
                                    </div>
                                    {/* button add*/}
                                    <div className='flex flex-row-reverse'>
                                        <Button className='border-none' onClick={handleAddStudent}>
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                {/* cards */}
                <div className='flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth'>
                    {filteredStudentList.map((val, i) => {
                        return (
                            <StudentCard
                                key={i}
                                student={val}
                                setStudentInfo={setStudentInfo}
                                onGetStudentOfClass={handleGetStudentOfClass}
                            />
                        );
                    })}
                </div>
            </div>
            {/* right */}
            <div className='w-[60%] bg-white py-5 px-10 overflow-y-auto'>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    <img
                        src='https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000'
                        alt=''
                        className='w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5'
                    />
                    <div className='flex flex-col justify-center items-center'>
                        <span className='font-bold text-2xl my-3'>{studentInfo?.fullName}</span>
                        <span className='text-gray-500 text-sm'>
                            Date of birth : {moment(studentInfo?.dateOfBirth).format('DD/MM/YYYY')}
                        </span>
                    </div>
                    {/* swiper */}
                    <div className='flex flex-col z-0 justify-center items-center select-none w-[750px] select-none'>
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className='mySwiper w-[100%] justify-center items-center'
                        >
                            <SwiperSlide>
                                <div className='h-[200px] w-[200px] pt-5 font-opensan'>
                                    <CustomProgressBar
                                        value={averageScore}
                                        circleRatio={0.75}
                                        initialAnimation={true}
                                        styles={buildStyles({
                                            pathColor: '#5199ad',
                                            rotation: 1 / 2 + 1 / 8,
                                            trailColor: '#eee',
                                        })}
                                    >
                                        <div className='flex flex-col items-center justify-center text-primary'>
                                            <span className='font-semibold text-4xl'>
                                                {averageScore}
                                            </span>
                                            <span className='font-semibold text-sm'>
                                                Average Score
                                            </span>
                                        </div>
                                    </CustomProgressBar>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col'>
                                    <div
                                        className='h-[160px] w-[200px] bg-cover'
                                        style={{
                                            backgroundImage: "url('" + achievementImg + "')",
                                        }}
                                    ></div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-primary text-2xl'>56</span> Topics
                                        completed
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    {/*  */}
                    <div className='flex flex-col gap-7'>
                        {/* Bio*/}
                        <div className='flex flex-col gap-3 w-full'>
                            <div>
                                <span className='text-2xl font-medium text-primary select-none'>
                                    Bio
                                </span>
                            </div>
                            <p className='text-justify text-base text-gray-500'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s
                                with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus
                                PageMaker including versions of Lorem Ipsum
                            </p>
                        </div>
                        {/* Topics */}
                        <div className='flex flex-col gap-3 w-full'>
                            <div>
                                <span className='text-2xl font-medium text-primary select-none'>
                                    Topics
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherManageStudents;
