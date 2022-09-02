import React from 'react'
import Banner from '@/p_home/Banner'
import Nav from '@/p_home/Nav'
import SearchBar from '@/p_home/SearchBar'

const Header = ({ banner, fixedEntries }) => {
  return (
    <section>
      <SearchBar />
      <Banner data={banner} />
      <Nav data={fixedEntries} />
    </section>
  )
}

export default Header