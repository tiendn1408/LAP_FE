import React from 'react'
import Modal from 'react-modal'
import Button from '../Button'

const ConfirmModal = ({ isOpen, message, yesConfirm, noConfirm }) => {
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

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-4 w-[500px]">
        <span className="text-2xl font-medium">Confirm</span>
        <span>{message}</span>
      </div>
      <div className="flex flex-row-reverse gap-5">
        <Button onClick={yesConfirm}>Yes</Button>
        <Button onClick={noConfirm}>No</Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
