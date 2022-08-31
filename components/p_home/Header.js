import React from 'react'
import Banner from '@/p_home/Banner'
import Nav from '@/p_home/Nav'
import SearchBar from '@/p_home/SearchBar'

const Header = () => {
  return (
    <section>
      <SearchBar />
      <Banner />
      <Nav />
    </section>
  )
}

export default Header
