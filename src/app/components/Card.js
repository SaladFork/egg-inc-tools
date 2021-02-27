import React from 'react'
import t from 'prop-types'

const Card = ({ title, children }) => {
  return (
    <div className="w-full border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
      {title && (
        <div className="bg-gray-200 dark:bg-gray-600">
          <h1 className="font-bold text-xl p-4 dark:text-white text-opacity-70">
            {title}
          </h1>
        </div>
      )}
      {children}
    </div>
  )
}

Card.propTypes = {
  title: t.string,
}

export default Card
