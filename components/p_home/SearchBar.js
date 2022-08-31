import Link from 'next/link'
import s from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <section className={s.wrapper}>
      <Link href="/search">
        <a className={s.search}>search</a>
      </Link>
      <Link href="/user">
        <a className={s.user} />
      </Link>
    </section>
  )
}

export default SearchBar
