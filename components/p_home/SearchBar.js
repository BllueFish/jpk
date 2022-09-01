import Link from 'next/link'
import s from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <section className={s.wrapper}>
      <Link href="/search">
        <a className={s.search}>输入搜索内容</a>
      </Link>
      <Link href="/user">
        <a className={s.user} />
      </Link>
    </section>
  )
}

export default SearchBar
