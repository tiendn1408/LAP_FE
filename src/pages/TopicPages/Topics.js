import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import { API_URL } from '../../constant';
import Table from '../../components/Table';
import ModalAddTopic from './ModalAddTopic';
import createAxiosJWT from '../../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const Topics = () => {
    const thead = [
        {
            width: '25%',
            title: 'TOPIC',
        },
        {
            width: '25%',
            title: 'NO. SKILLS',
        },
        {
            width: '25%',
            title: 'PREREQUISITES',
        },
        {
            width: '25%',
            title: '',
        },
    ];
    const navigate = useNavigate();
    const { classId } = useParams();

    const [topics, setTopics] = useState([]);
    const [valueTopics, setValueTopics] = useState([]);
    const [values, setValues] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleDeleteClassTopic = (id) => {
        axios.delete(API_URL + `class-topic/${id}`).then((res) => {
            getTopicOfClass();
        });
    };

    const handleViewDetailTopic = (id) => {
        const topic = valueTopics.find((valueTopic) => valueTopic.classTopicId === id);
        navigate(`/class/${classId}/topic/${topic?.id}`, {
            state: topic,
        });
    };

    const getTopicOfClass = () => {
        axiosJWT.get(API_URL + `class-topic/teacher/class/${classId}`).then((res) => {
            let result = res.data;
            let arrayResult = [];
            let arrayValueTopic = [];
            for (let i = 0; i < result.length; ++i) {
                arrayResult = [
                    ...arrayResult,
                    {
                        id: result[i].id,
                        topicName: result[i].topicName,
                        numberSkills: result[i].numberSkills,
                        prerequisiteTopicName: result[i].prerequisiteTopicName,
                    },
                ];
                arrayValueTopic = [
                    ...arrayValueTopic,
                    {
                        id: result[i].topicId,
                        topicName: result[i].topicName,
                        description: result[i].description,
                        classTopicId: result[i].id,
                    },
                ];
            }
            setValueTopics(arrayValueTopic);
            setValues(arrayResult);
            setCurrentPage(arrayResult.length > 0 ? 1 : 0);
        });
    };

    function handleOpenModalAddTopic() {
        setIsOpen(true);
    }
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        const newOffset = (event.selected * 5) % values.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        getTopicOfClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + 5;
        setTopics(values.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(values.length / 5));
    }, [itemOffset, values]);

    return (
        <div className='pt-[40px] px-[68px] h-screen'>
            <div className='flex gap-2 items-center'>
                <i className='fas fa-caret-left text-xl font-bold'></i>
                <span
                    className='underline underline-offset-4 font-semibold cursor-pointer'
                    onClick={() => {
                        navigate('/class');
                    }}
                >
                    All Classes
                </span>
            </div>
            <div className='w-full h-[68px] bg-primary flex items-center justify-between mt-[20px] rounded-xl shadow-lg px-12'>
                <h1 className='text-2xl font-medium uppercase text-white'>Topics</h1>
                <button
                    className='h-7 w-24 px-2 flex items-center justify-center text-white rounded-xl border-[1px]'
                    onClick={handleOpenModalAddTopic}
                >
                    {/* material-icons */}
                    <span className=' flex items-center justify-center mr-1'>Add</span>
                    <span>topic</span>
                </button>
                <ModalAddTopic
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    getTopicOfClass={getTopicOfClass}
                />
            </div>

            <div className='flex flex-col justify-between mb-[40px] h-[77%]'>
                <div className='grow'>
                    <Table
                        thead={thead}
                        tbody={topics}
                        actions={[
                            {
                                name: 'View detail',
                                eventAction: handleViewDetailTopic,
                            },
                            {
                                name: 'Delete',
                                eventAction: handleDeleteClassTopic,
                            },
                        ]}
                    />
                </div>
                <div className='mt-[16px] flex justify-between px-5'>
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
    );
};

export default Topics;
