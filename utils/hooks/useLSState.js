import { useEffect, useState } from 'react'
import ls from 'store2'

/**
 * localStorage 同步 State
 * @param {*} key 存储的键
 * @param {*} defaultVal 默认值
 */
const useLSState = (key, defaultVal = '') => {
  const [state, setState] = useState(defaultVal)

  const setter = (newVal) => {
    if (!newVal) return
    setState(newVal)
    ls.set(key, newVal)
  }

  const cleanUp = () => {
    setState(defaultVal)
  }

  // 只在客户端执行
  useEffect(() => {
    if (ls(key) === null) {
      ls.set(key, defaultVal)
    } else {
      setState(ls.get(key))
    }

    return () => {
      cleanUp()
    }
  }, [])

  return [state, setter]
}

export default useLSState
