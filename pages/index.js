import Head from 'next/head'
import Header from '@/p_home/Header'
import Talk from '@/p_home/Talk'
import Recommend from '@/p_home/Recommend'

export default function Home() {
  return (
    <div>
      <Head>
        <title>精品课</title>
      </Head>
      <main>
        <h3>首页</h3>
        <Header />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}
