import Link from 'next/link';
import SectionHeader from './SectionHeader'
import s from './Talk.module.css'

const Talk = ({ data }) => {
  const { recommend = [], card = [] } = data || {};
  const recommendObj = Object.fromEntries(recommend.map((item) => [item?.type, item]))

  console.log(card);
  return (
    <section>
      <SectionHeader title='公开课' subTitle="Today's public class" url=''/>
      <div className={s.imgs}>
        <Link 
          href="/course/detail/[id]" 
          as={`/course/detail/${recommendObj.left?.courseId}`}
        >
          <div className={s.left}>
            <img src={recommendObj.left?.img} alt={recommendObj.left?.title}/>
          </div>
        </Link>
         <div className={s.right}>
          <Link 
            href="/course/detail/[id]" 
            as={`/course/detail/${recommendObj.rightTop?.courseId}`}
          >
            <img src={recommendObj.rightTop?.img} alt={recommendObj.rightTop?.title}/>
          </Link>
           <Link 
            href="/course/detail/[id]" 
            as={`/course/detail/${recommendObj.rightBottom?.courseId}`}
          >
            <img src={recommendObj.rightBottom?.img} alt={recommendObj.rightBottom?.title}/>
          </Link>
        </div>
      </div>
      <div className={s.card}>
        {card?.map((item) => (
          <div className={s.item} key={item?.courseId}>
            <h4>{item?.title}</h4>
            <div className={s.footer}>
              <div className={s.teacher}>
                <img src={item?.teacher?.img || '/img/teacher1.png'} alt={item?.teacher?.title  || '有道名师'}/>
                <span>{item?.teacher?.title || '有道名师'}</span>
              </div>
              <Link 
                href="/course/detail/[id]" 
                as={`/course/detail/${item?.courseId}`}
              >
                <img src='/img/ic_detail.png' alt='详情'/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Talk
