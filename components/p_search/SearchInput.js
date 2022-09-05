import { useRef } from 'react'
import s from './SearchInput.module.css'

const SearchInput = (props) => {
  const inputEl = useRef(null)
  const { inputVal, setInputVal, showHistory, fetchSuggest, submitSearch } = props

  const handleChange = (e) => {
    const val = e.target.value
    const trimVal = val?.trim()
    setInputVal(val)
    if (!trimVal) {
      fetchSuggest.cancel() // 取消等待的搜索建议请求
      // 搜索数据为空时，切换为搜索历史页
      showHistory()
      return
    }
    if (trimVal !== inputVal) {
      fetchSuggest(trimVal)
    }
  }

  // 键盘，输入框回车确认搜索（不触发onchange）
  const handleKeyUp = (e) => {
    if (e.keyCode !== 13 || !inputEl?.current) return
    ;(e || window.event).preventDefault() // 阻止默认行为
    fetchSuggest.cancel() // 取消等待的搜索建议请求
    const filteredVal = inputEl.current.value?.trim()
    if (!filteredVal) {
      setInputVal('')
      return
    }
    submitSearch(filteredVal)
    // 收起键盘
    inputEl.current.blur()
    // 禁止表单自动提交
    return false
  }

  const clearInput = () => {
    fetchSuggest.cancel() // 取消等待的搜索建议请求
    showHistory() // 展示历史页
    setInputVal('')
    inputEl.current.focus() // 输入框重获焦点
  }

  return (
    <div className={s.inputContainer}>
      <div className={`${s.formCont} border-b-1px ${inputVal ? '' : s.empty}`}>
        {/* form + type="search" 让虚拟键盘的回车键文字显示为 ‘搜索’ */}
        <form action="">
          <input
            ref={inputEl}
            type="search"
            className={s.input}
            placeholder="请输入搜索内容"
            value={inputVal}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          {/* 隐藏的input来禁止回车表单自动提交 */}
          <input type="text" style={{ display: 'none' }} />
        </form>
        {inputVal ? <button className={s.clean} onClick={clearInput} /> : null}
      </div>
    </div>
  )
}

export default SearchInput
