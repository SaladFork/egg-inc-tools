import React from 'react'
import classnames from 'classnames'

const Input = ({ className: passedClassName, disabled, ...rest }) => {
  return (
    <input
      className={classnames(
        'p-2 rounded-lg',
        'border-2 border-gray-200 dark:border-gray-600',
        disabled
          ? 'bg-gray-200 dark:bg-gray-600 dark:text-white text-opacity-50 cursor-not-allowed'
          : 'bg-white dark:bg-gray-800 dark:text-white dark:text-opacity-95',
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-gray-600',
        'shadow-md',
        passedClassName
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

Input.propTypes = {}

export default Input
