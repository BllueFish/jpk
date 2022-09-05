import s from './Suggest.module.css'

const Suggest = ({ data = [], submitSearch }) => {
  return (
    <div className={s.container}>
      {data && data.length
        ? data.map((item, index) => (
            <div
              key={`${item}_${index}`}
              className={`${s.item} border-b-1px`}
              onClick={() => submitSearch(item)}>
              {item}
            </div>
          ))
        : null}
    </div>
  )
}

export default Suggest
