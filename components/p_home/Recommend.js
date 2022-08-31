import React from 'react'
import SectionHeader from './SectionHeader'
import CourseCard from './CourseCard'

// 推荐课程list
const Recommend = () => {
  const data = []
  return (
    <section>
      <SectionHeader />
      Recommend
      {data.map((item) => (
        <CourseCard key={item?.id} />
      ))}
    </section>
  )
}

export default Recommend
