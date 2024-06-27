import React from 'react'
import { motion } from 'framer-motion'

const Requests = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: 'auto' }}
        className="overlay"
      ></motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={``}></motion.div>
      </div>
    </>
  )
}

export default Requests
