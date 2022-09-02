import { PureComponent } from 'react'
import s from './LoadMore.module.css'

let timer = null

const renderContent = (isLoadingMore, hasMore, customNoMoreText) => {
  if (isLoadingMore) {
    return <div className={s.loadText}>正在加载...</div>
  }

  return hasMore ? (
    <div className={s.loadText}>&nbsp;</div>
  ) : (
    <div className={s.loadText}>{customNoMoreText || '没有更多了'}</div>
  )
}

export default class LoadMore extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingMore: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    // 防抖
    if (timer) clearTimeout(timer)
    /*
      执行条件：
      1. 有更多数据可以加载：`hasMore`
      2. 没有正在加载更多：`not loading`
      3. `scroll` 触达底部：`已滚动距离+屏幕高度>=文档总高度`
    */
    const { isLoadingMore } = this.state
    const { hasMore, onReachBottom } = this.props
    const curScrollY = window.scrollY // 文档垂直方向已滚动高度
    const height = window.screen.height
    const docLength = window.document.body.scrollHeight
    if (!isLoadingMore && hasMore && curScrollY + height >= docLength) {
      timer = setTimeout(() => {
        this.setState({ isLoadingMore: true })
        onReachBottom()
          .then(() => {
            this.setState({ isLoadingMore: false })
            clearTimeout(timer)
          })
          .catch((e) => console.log(e))
          .finally(() => this.setState({ isLoadingMore: false }))
      }, 300)
    }
  }

  render() {
    const { isLoadingMore } = this.state
    const { hasMore, customNoMoreText } = this.props

    return (
      <div className={s.loadMore}>{renderContent(isLoadingMore, hasMore, customNoMoreText)}</div>
    )
  }
}
