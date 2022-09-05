import CourseCard from '@/common/CourseCard'
import LoadMore from '@/common/LoadMore'
import Link from 'next/link'
import { memo, useCallback, useState } from 'react'
import { getSearchResult } from 'services/api'
import s from './Result.module.css'

const PAGE_SIZE = 10

const Result = ({ kw = '', data = [] }) => {
  const [result, setResult] = useState({
    current: 1,
    list: data,
    hasMore: true,
  })

  const fetchResult = useCallback(async () => {
    try {
      const list = await getSearchResult(kw, result.current)
      setResult({
        current: result.current + 1,
        list: result.list.concat(list),
        hasMore: list.length === PAGE_SIZE,
      })
    } catch (e) {
      console.log(e)
    }
  }, [result, setResult, kw])

  if (data && data.length) {
    return (
      <section className={s.container}>
        <h3 className="border-b-1px">相关课程</h3>
        {result.list.map((item) => (
          <CourseCard data={item} key={item.id} />
        ))}
        <LoadMore
          hasMore={result.hasMore}
          customNoMoreText="我是有底线的"
          onReachBottom={fetchResult}
        />
      </section>
    )
  }

  return (
    <section>
      <img className={s.img} src="/img/errorImage.png" alt="error" />
      <div className={s.title}>Sorry! 暂时没发现您想查找的课程</div>
      <Link href="/">
        <a className={`${s.back} border-all-1px`}>返回首页</a>
      </Link>
    </section>
  )
}

export default memo(Result)
