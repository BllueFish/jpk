import Slider from 'react-slick'
import Link from 'next/link'
import s from './Banner.module.css'

const Banner = ({ data = [] }) => {
 // 这里对只有一张图片的case做了处理
const isSwiperable = !!(data && data.length)
const settings = {
    arrows: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: isSwiperable,
    infinite: isSwiperable,
    swipe: isSwiperable,
    dots: isSwiperable,
    dotsClass: `dots home-banner-dots ${s['banner-dots']}`,
    className: 'slider-banners',
  }
  return (
    <section className={s.wrapper}>
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <Link 
              key={`${item?.img}_${index}`} 
              href="/course/detail/[id]" 
              as={`/course/detail/${item?.courseId}`}
            >
              <img src={item?.img} alt={item?.title || 'image'} className={s.slide} />
            </Link>
          )
        })}
      </Slider>
      <div className={s.mask}></div>
    </section>
  )
}

export default Banner
