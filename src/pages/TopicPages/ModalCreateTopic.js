import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import axios from 'axios';

import { API_URL } from '../../constant';
import Button from '../../components/Button';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const ModalCreateTopic = ({ modalTopicIsOpen, setTopicIsOpen, getTopicOfGrade }) => {
    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: formStateCreate,
    } = useForm();

    const [grades, setGrades] = useState([]);
    const [prerequisiteTopicGrades, setPrerequisiteTopicGrades] = useState([]);

    function getAllGrades() {
        axios.get(API_URL + `grade`).then((res) => {
            setGrades(res.data);
        });
    }
    function getPrerequisiteTopicOfGrade() {
        axiosJWT.get(API_URL + `topic/teacher/grade/1`).then((res) => {
            setPrerequisiteTopicGrades(res.data);
        });
    }
    function handleCloseModalCreateTopic() {
        setTopicIsOpen(false);
    }

    useEffect(() => {
        getAllGrades();
        getPrerequisiteTopicOfGrade();
    }, []);

    useEffect(() => {
        if (formStateCreate.isSubmitSuccessful) {
            resetCreate({
                topicName: '',
                description: '',
                gradeId: -1,
                prerequisiteTopicId: -1,
            });
            handleCloseModalCreateTopic();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStateCreate, resetCreate]);

    function handleCreateTopic(data) {
        console.log(data);
        const topic = {
            ...data,
            teacherId: 1,
        };
        axios.post(API_URL + `topic`, topic).then((res) => {
            getTopicOfGrade();
        });
    }

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

    return (
        <Modal
            isOpen={modalTopicIsOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex justify-end'>
                <button onClick={handleCloseModalCreateTopic}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <form
                className='flex flex-col w-[500px]'
                onSubmit={handleSubmitCreate(handleCreateTopic)}
            >
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-center'>
                        <h2 className='text-2xl font-semibold'>Create new topic</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='topicName'>Name</label>
                        <input
                            type='text'
                            name='topicName'
                            placeholder='Enter topic name'
                            className='outline-none border border-gray-500 px-2 py-1 rounded'
                            {...registerCreate('topicName')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Description'
                            className='resize-none outline-none border border-gray-500 px-2 py-1 rounded'
                            {...registerCreate('description')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='grade'>Grade</label>
                        <select
                            name='grade'
                            className='border border-gray-500 rounded px-2'
                            defaultValue='-1'
                            {...registerCreate('gradeId')}
                        >
                            <option disabled value='-1'>
                                -- Select a grade --
                            </option>
                            {grades.map((grade) => {
                                return (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.gradeName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='prerequisiteTopic'>Prerequisite topic</label>
                        <select
                            name='prerequisiteTopic'
                            className='border border-gray-500 rounded px-2'
                            defaultValue='-1'
                            {...registerCreate('prerequisiteTopicId')}
                        >
                            <option disabled value='-1'>
                                -- Select a prerequisite topic --
                            </option>
                            {prerequisiteTopicGrades &&
                                prerequisiteTopicGrades.map((topic) => {
                                    return (
                                        <option key={topic.id} value={topic.id}>
                                            {topic.topicName}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <Button className='border-none bg-primary w-full mt-5'>Create</Button>
            </form>
        </Modal>
    );
};

export default ModalCreateTopic;
