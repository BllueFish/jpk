import { useMemo, useState } from 'react'
import History from '@/p_search/History'
import Suggest from '@/p_search/Suggest'
import Result from '@/p_search/result'
import SearchInput from '@/p_search/SearchInput'
import { getHotWord, getSearchResult, getSearchSuggest } from 'services/api'
import { useRouter } from 'next/router'
import throttle from 'lodash/throttle'
import s from './index.module.css'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}

const Search = ({ kw, hotWords, result }) => {
  const router = useRouter()
  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY)
  const [inputVal, setInputVal] = useState(kw || '')
  const [suggestList, setSuggestList] = useState([])

  const renderContent = () => {
    switch (contType) {
      case TYPES.HISTORY:
        return <History submitSearch={submitSearch} />
      case TYPES.SUGGEST:
        return <Suggest data={suggestList} submitSearch={submitSearch} />
      case TYPES.RESULT:
        return <Result />
    }
  }

  const showHistory = () => setContType(TYPES.HISTORY)

  // 搜索建议（节流）
  const fetchSuggest = useMemo(
    () =>
      throttle(async (kw = '') => {
        if (contType !== TYPES.SUGGEST) setContType(TYPES.SUGGEST)
        try {
          const data = await getSearchSuggest(kw)
          setSuggestList(data || [])
        } catch (e) {
          console.log(e)
        }
      }, 300),
    [contType, setContType, setSuggestList],
  )

  /**
   * 1、改变搜索kw
   * 2、请求搜索结果数据
   * 3、内容类型切换到搜索结果页
   * 4、更新 url（填充上搜索的kw)
   */
  const submitSearch = async (kw = '') => {
    if (contType !== TYPES.RESULT) setContType(TYPES.RESULT)
    setInputVal(kw)
    // 路由替换
    router.replace({
      pathname: '/search',
      query: {
        kw,
      },
    })
  }

  return (
    <div>
      <SearchInput
        inputVal={inputVal}
        setInputVal={setInputVal}
        showHistory={showHistory}
        fetchSuggest={fetchSuggest}
        submitSearch={submitSearch}
      />
      <div className={s.content}> {renderContent()}</div>
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const { query } = context
  const { kw = '' } = query
  let [hotWords, result] = [[], []]
  if (kw && kw.trim()) {
    // 热门词汇 & 搜索结果
    const [resultRes, hotWordsRes] = await Promise.allSettled([
      getSearchResult(kw.trim()),
      getHotWord(),
    ])
    hotWords = hotWordsRes.value
    result = resultRes.value
  } else {
    // 热门词汇
    hotWords = await getHotWord()
  }

  return {
    props: {
      kw: kw?.trim(),
      hotWords: hotWords || [],
      result: result || [],
    },
  }
}
