import React from 'react'
import t from 'prop-types'
import classnames from 'classnames'

const Input = ({ className: passedClassName, ...rest }) => {
  return (
    <input
      className={classnames(
        'p-2 rounded-lg',
        'border-2 border-gray-200',
        'focus:outline-none focus:border-blue-500',
        'shadow-md',
        passedClassName
      )}
      {...rest}
    />
  )
}

Input.propTypes = {}

export default Input
