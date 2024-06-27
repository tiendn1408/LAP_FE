import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

const CustomProgressBar = (props) => {
  const { children, ...otherProps } = props
  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
      }}
    >
      <div style={{ position: 'absolute' }}>
        <CircularProgressbar {...otherProps} />
      </div>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

export default CustomProgressBar
