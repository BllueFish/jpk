import Head from 'next/head'
import Header from '@/p_home/Header'
import Talk from '@/p_home/Talk'
import Recommend from '@/p_home/Recommend'
import { getHome } from 'services/api'

export default function Home({ home = {} }) {
  const { banner, fixedEntries } = home;
  return (
    <div>
      <Head>
        <title>精品课</title>
      </Head>
      <main>
        <Header banner={banner} fixedEntries={fixedEntries} />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}

// ssr 渲染的方式获取数据
export async function getServerSideProps() {
  try {
    const data = await getHome()
    return { props: { home: data } }
  } catch (error) {
    return { props: { home: { banner: [] } } }
  }
}