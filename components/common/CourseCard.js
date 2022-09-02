import Link from 'next/link'
import { memo, useState } from 'react'
import s from './CourseCard.module.css'
import CountDown from './CountDown'

const renderSimplePrice = (price) => (
  <span className={s.price}>
    <span className={s.icon}>¥</span>
    {price}
  </span>
)

const CourseCard = ({ data = {} }) => {
  const {
    courseTitle = '',
    id = '',
    categoryName = '',
    courseTime,
    lessonNum = '',
    price = '',
    salePrice = '',
    saleNum,
    saleType,
    saleEndTime,
    teacherList = [],
  } = data
  const [countDownFinished, setCountDownFinished] = useState(false)

  const renderPromotion = () => {
    // 促销中
    if (saleType === 1 && !countDownFinished) {
      return (
        <div className={s.promotion}>
          <div>
            {/* 原价 */}
            <span className={s.deleted}>
              <span className={s.icon}>¥</span>
              {price}
            </span>
            {/* 促销价 */}
            {renderSimplePrice(salePrice)}
          </div>
          <div className={s.desc}>
            剩 <CountDown end={saleEndTime} onEnd={() => setCountDownFinished(true)} />
            &nbsp;恢复原价
          </div>
        </div>
      )
    }

    return (
      <div className={s.promotion}>
        <div>{price === 0 ? <span className={s.price}>免费</span> : renderSimplePrice(price)}</div>
        <div className={s.desc}>已有{saleNum || 0}人购买</div>
      </div>
    )
  }

  return (
    <Link href="/course/detail/[id]" as={`/course/detail/${id}`}>
      <a className={`${s.card} border-b-1px`}>
        <h5>
          <span className={s.categoryTag}>{categoryName}</span>
          <span className={s.title}>{courseTitle}</span>
        </h5>
        {/* 开课时间 */}
        <div className={s.time}>
          <span>开课时间: &nbsp;&nbsp;{courseTime || '随到随学'}</span>
          <span className={s.lessonNum}>{lessonNum}课时</span>
        </div>
        {/* 课程信息 */}
        <div className={s.footer}>
          <div className={s.left}>
            {teacherList && teacherList.length > 0
              ? teacherList.slice(0, 3).map((item, index) => (
                  <div key={`${item.name}_${index}`} className={s.teacher}>
                    <div className={s.imgWrapper}>
                      <img
                        className={s.avatar}
                        src={item?.img || '/img/teacher1.png'}
                        alt="techaer_avatar"
                      />
                      <div className={s.avatarBorder} />
                    </div>
                    <span>{item?.name || ''}</span>
                  </div>
                ))
              : null}
          </div>
          {renderPromotion()}
        </div>
      </a>
    </Link>
  )
}

export default memo(CourseCard)
