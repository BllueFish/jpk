import s from './Nav.module.css'
import Slider from 'react-slick'
import Link from 'next/link'
import { memo } from 'react'

const Nav = ({ data = [] }) => {
  // 这里对只有一张图片的case做了处理
  const isSwiperable = !!(data && data.length)
  const settings = {
    arrows: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite: true,
    swipe: isSwiperable,
    dots: isSwiperable,
    dotsClass: `dots home-nav-dots ${s['banner-dots']}`,
    className: 'slider-banners',
  }
  const renderSlideCard = () => {
    const navList = [...data];
    const slideCard = [];
    while (navList.length>0) {
      slideCard.push(
        <div key={slideCard.length} className={s.slide}>
          {navList.splice(0, navList.length>8 ? 8 : navList.length).map((item, index) => (
            <Link 
              key={`${item?.img}_${index}`} 
              href="/course/detail/[id]" 
              as={`/course/detail/${item?.id}`}
            >
              <div className={s.item}>
                <img src={item?.img} alt={item?.title || 'image'} className={s.icon} />
                <div className={s.title}>{item.title || ''}</div>
              </div>
            </Link>
          ))}
        </div>
      )
    }
      console.log(slideCard);
    return slideCard;
  }
  return (
    <div className={s.nav}>
      <Slider {...settings} >
        {renderSlideCard()}
      </Slider>
    </div>
  )
}

export default memo(Nav)
