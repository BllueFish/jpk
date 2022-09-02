import React, { memo } from 'react'

const CourseCard = ({ data = {} }) => {
  const { courseTitle = '' } = data

  return (
    <div>
      <h1>{courseTitle}</h1>
    </div>
  )
}

export default memo(CourseCard)
