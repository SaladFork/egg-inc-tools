import React from 'react'
import t from 'prop-types'
import classnames from 'classnames'

const Button = ({ primary, className: passedClassName, ...rest }) => {
  const colorClasses = primary
    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
    : ''

  return (
    <button
      className={classnames(
        colorClasses,
        'px-6 py-2 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-opacity-50',
        'font-medium text-opacity-90',
        'select-none shadow-md',
        passedClassName
      )}
      {...rest}
    />
  )
}
Button.propTypes = {
  primary: t.bool,
}
Button.defaultProps = {
  primary: false,
}

export default Button
