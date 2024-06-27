import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import axios from 'axios';

import { API_URL } from '../../constant';
import Button from '../../components/Button';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const ModalCreateSkill = ({
    modalCreateSkillIsOpen,
    setCreateSkillIsOpen,
    topicId,
    getTopicOfClass,
}) => {
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
    const {
        register: registerCreate,
        handleSubmit: handleSubmitCreate,
        reset: resetCreate,
        formState: formStateCreate,
    } = useForm();

    const [standards, setStandards] = useState([]);

    const handleCloseModalCreateSkill = () => {
        setCreateSkillIsOpen(false);
    };

    const handleCreateSkill = (data) => {
        const skill = {
            ...data,
            topicId,
        };
        axiosJWT.post(API_URL + `skill`, skill).then((res) => {
            getTopicOfClass();
        });
    };

    const getStandards = () => {
        axios.get(API_URL + `standard`).then((res) => {
            setStandards(res.data);
        });
    };

    useEffect(() => {
        getStandards();
    }, []);

    useEffect(() => {
        if (formStateCreate.isSubmitSuccessful) {
            resetCreate({
                skillName: '',
                description: '',
                standardId: -1,
                topicId: -1,
            });
            handleCloseModalCreateSkill();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStateCreate, resetCreate]);

    return (
        <Modal
            isOpen={modalCreateSkillIsOpen}
            style={customStyles}
            contentLabel='Example Modal'
            ariaHideApp={false}
        >
            <div className='flex justify-end'>
                <button onClick={handleCloseModalCreateSkill}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
            <form
                className='flex flex-col w-[500px]'
                onSubmit={handleSubmitCreate(handleCreateSkill)}
            >
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-center'>
                        <h2 className='text-2xl font-semibold'>Create new skill</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='skillName'>Name</label>
                        <input
                            type='text'
                            name='skillName'
                            placeholder='Enter skill name'
                            className='outline-none border border-gray-500 px-2 py-1 rounded'
                            {...registerCreate('skillName')}
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
                        <label htmlFor='standard'>Standard of skill</label>
                        <select
                            name='standard'
                            className='border border-gray-500 rounded px-2'
                            defaultValue='-1'
                            {...registerCreate('standardId')}
                        >
                            <option disabled value='-1'>
                                -- Select standards --
                            </option>
                            {standards.map((standard) => {
                                return (
                                    <option key={standard.id} value={standard.id}>
                                        {standard.standardName}
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

export default ModalCreateSkill;
