import React from 'react';

const Button = ({ children, className = '', ...rest }) => {
    return (
        <button
            className={`bg-primary py-2 px-5 rounded-lg border-2 text-white transition-all active:scale-90 cursor-pointer select-none hover:bg-opacity-90 text-center border-none ${className} `}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
