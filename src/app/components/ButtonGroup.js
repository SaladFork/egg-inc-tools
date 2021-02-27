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
    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium'
    : 'hover:bg-gray-100 active:bg-gray-200 border-grey-200'

  return (
    <button
      className={classnames(
        colorClasses,
        'px-4 py-1 rounded-none first:rounded-l-md last:rounded-r-md',
        // 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-opacity-50',
        'text-opacity-90',
        'border',
        'select-none',
        passedClassName
      )}
      {...rest}
    />
  )
}

export default ButtonGroup
