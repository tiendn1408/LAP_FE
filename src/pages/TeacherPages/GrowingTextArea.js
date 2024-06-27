import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const GrowingTextArea = React.forwardRef(
  ({ isEditing, className = '', ...rest }, ref) => {
    const moveCaretAtEnd = (e) => {
      var temp_value = e.target.value
      e.target.value = ''
      e.target.value = temp_value
    }
    return (
      <TextareaAutosize
        ref={ref}
        minRows={3}
        className={`outline-none transition-all resize-none px-3 py-2 rounded-lg border-2 ${
          isEditing ? `border-primary` : `border-transparent`
        } ${className}`}
        onFocus={(e) => moveCaretAtEnd(e)}
        {...rest}
      />
    )
  },
)

export default GrowingTextArea
