import SectionHeader from './SectionHeader'
import CourseCard from '../common/CourseCard'
import { getRecommend } from 'services/api'
import { useCallback, useEffect, useState } from 'react'
import LoadMore from '@/common/LoadMore'
import s from './Recommend.module.css'

const PAGE_SIZE = 10

// 推荐课程list
const Recommend = () => {
  const [recommend, setRecommend] = useState({
    list: [],
    current: 0, // 页码
    hasMore: true, // 是否还有更多
  })

  const fetchRecommend = useCallback(async () => {
    try {
      const list  = await getRecommend({
        start: recommend.current,
        offset: PAGE_SIZE,
      })
      setRecommend({
        list: [...recommend.list, ...list],
        current: recommend.current + 1,
        hasMore: list.length === PAGE_SIZE,
      })
    } catch (error) {
      console.log(error);
    }
  }, [recommend])

  useEffect(() => {
    fetchRecommend()
  }, [])

  return (
    <section>
      <SectionHeader title='课程精选' subTitle="Course selection" url=''/>
     <div className={s.list}>
        {recommend.list.map((item) => (
          <CourseCard key={item?.id} data={item} />
        ))}
     </div>
     {/* 加载更多 */}
     <LoadMore  onReachBottom={fetchRecommend} hasMore={recommend.hasMore} />
    </section>
  )
}

export default Recommend
