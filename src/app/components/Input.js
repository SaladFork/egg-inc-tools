import React from 'react'
import t from 'prop-types'
import classnames from 'classnames'

const Input = ({ className: passedClassName, ...rest }) => {
  return (
    <input
      className={classnames(
        'p-2 rounded-lg',
        'border-2 border-gray-200 dark:border-gray-600',
        'dark:bg-gray-800 dark:text-white dark:text-opacity-95',
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-gray-600',
        'shadow-md',
        passedClassName
      )}
      {...rest}
    />
  )
}

Input.propTypes = {}

export default Input
