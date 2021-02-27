import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const ButtonGroup = ({ className: passedClassName, ...rest }) => {
  return (
    <div
      className={classnames('flex rounded-md shadow-md', passedClassName)}
      {...rest}
    />
  )
}

ButtonGroup.propTypes = {}

ButtonGroup.Button = ({ selected, className: passedClassName, ...rest }) => {
  const colorClasses = selected
    ? 'bg-blue-600 active:bg-blue-800 text-white font-medium border-blue-600 dark:bg-gray-600 dark:border-gray-600'
    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-600 active:bg-gray-200 border-grey-200 dark:border-gray-600'

  return (
    <button
      className={classnames(
        colorClasses,
        'px-4 py-1 rounded-none first:rounded-l-md last:rounded-r-md',
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30',
        'dark:text-white text-opacity-90',
        'border',
        'select-none',
        passedClassName
      )}
      {...rest}
    />
  )
}

export default ButtonGroup
