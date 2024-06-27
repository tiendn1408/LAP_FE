import React from 'react'

const GrowingInput = React.forwardRef(
  ({ isEditing, className, ...rest }, ref) => {
    console.log(rest)
    return (
      <input
        ref={ref}
        size={rest?.value.length}
        className={`outline-none px-3 transition-all border-b-2 py-2 ${className} ${
          isEditing ? ` border-primary ` : `border-transparent`
        } `}
        {...rest}
      />
    )
  },
)

export default GrowingInput
