import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import axios from 'axios'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import ModalCreateTopic from './ModalCreateTopic'
import createAxiosJWT from '../../createAxiosJWT'
import { memo } from 'react'

const axiosJWT = createAxiosJWT()
const ModalAddTopic = ({
  classId,
  modalIsOpen,
  setIsOpen,
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
  }

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: formStateAdd,
  } = useForm()

  const handleCreateClassTopic = async (classTopic) => {
    try {
      await axios.post(API_URL + `class-topic`, { ...classTopic, classId })
      getTopicOfClass()
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleCloseModalAddTopic = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const [topicGrades, setTopicGrades] = useState([])
  const [modalTopicIsOpen, setTopicIsOpen] = useState(false)

  const getTopicOfGrade = () => {
    axiosJWT.get(API_URL + `topic/teacher/grade/1`).then((res) => {
      setTopicGrades(res.data)
    })
  }

  const handleOpenModalCreateTopic = useCallback(() => {
    setTopicIsOpen(true)
  }, [])

  useEffect(() => {
    getTopicOfGrade()
  }, [])

  useEffect(() => {
    if (formStateAdd.isSubmitSuccessful) {
      resetAdd({ topicId: -1, classId: -1 })
      handleCloseModalAddTopic()
    }
  }, [formStateAdd, handleCloseModalAddTopic, resetAdd])
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModalAddTopic()}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="relative">
        <button
          onClick={handleCloseModalAddTopic}
          className="absolute hover:text-red-400 transition-all text-2xl translate-x-[485px] -translate-y-[10px]"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className="flex" onSubmit={handleSubmitAdd(handleCreateClassTopic)}>
        <div className="flex flex-col gap-7 w-[500px] px-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Add topic</h2>
            <label htmlFor="topic">Topic</label>
            <select
              name="classes"
              className="border outline-none border-gray-500 rounded px-2"
              defaultValue="-1"
              {...registerAdd('topicId')}
            >
              <option disabled value="-1">
                -- Select an topic --
              </option>
              {topicGrades &&
                topicGrades.map((topic) => {
                  return (
                    <option key={topic.id} value={topic.id}>
                      {topic.topicName}
                    </option>
                  )
                })}
            </select>
            <span className="flex flex-row gap-1">
              Or create
              <span
                className="text-primary underline-offset-2 underline cursor-pointer"
                onClick={handleOpenModalCreateTopic}
              >
                new topic
              </span>
            </span>
          </div>
          <div className="flex justify-center">
            <Button className="bg-primary border-none w-[50%]">ADD</Button>
          </div>
        </div>
      </form>
      <ModalCreateTopic
        modalTopicIsOpen={modalTopicIsOpen}
        setTopicIsOpen={setTopicIsOpen}
        getTopicOfGrade={getTopicOfGrade}
      />
    </Modal>
  )
}

export default memo(ModalAddTopic)
