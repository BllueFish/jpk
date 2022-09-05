import Link from 'next/link'
import s from './History.module.css'

const History = ({ hotWords = [], history = [], submitSearch, clearHistory }) => {
  const renderHotItem = (item, index) => {
    // type = 2: 课程性情页面
    // type = 1: 词汇
    const text = item.title.slice(0, 6)
    if (item.type === 2) {
      return (
        <Link
          key={`${item?.id}_${index}`}
          href="/course/detail/[id]"
          as={`/course/detail/${item.id}`}>
          <a className={s.item}>{text}</a>
        </Link>
      )
    }
    return (
      <span key={`${item?.id}_${index}`} className={s.item} onClick={() => submitSearch?.(text)}>
        {text}
      </span>
    )
  }

  return (
    <>
      <section className={s.container}>
        <h3>热门搜索</h3>
        <div className={s.hotWord}>
          {hotWords && hotWords.length
            ? hotWords.slice(0, 6).map((item, index) => renderHotItem(item, index))
            : null}
        </div>
      </section>
      <section className={s.container}>
        <h3 className={`${s.historyHead} border-b-1px`}>
          搜索历史
          <button className={s.delete} onClick={clearHistory}>
            <img className={s.clean} src="./img/clean.png" alt="" />
          </button>
        </h3>
        <div className={s.hisotry}>
          {history && history.length
            ? history.map((item, index) => (
                <div
                  key={`${item}_${index}`}
                  className={`${s.list} border-b-1px`}
                  onClick={() => submitSearch(item)}>
                  {item}
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  )
}

export default History
