import { PureComponent } from 'react'
import s from './CountDown.module.css'
import { formatTime } from 'utils'

export default class CountDown extends PureComponent {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      curTimeStamp: new Date().getTime(),
    }
  }

  componentDidMount() {
    // 每次都取系统时间来重新校准时间
    this.timer = setInterval(() => {
      this.setState({
        curTimeStamp: new Date().getTime(),
      })
    }, 500)
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  componentDidUpdate() {
    const { end, onEnd } = this.props
    const { curTimeStamp } = this.state

    if (end - curTimeStamp < 0 && this.timer) {
      this.clearTimer()
      onEnd()
    }
  }

  // 清空计时器
  clearTimer = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { end } = this.props
    const { curTimeStamp } = this.state
    const restTime = formatTime(end - curTimeStamp)

    return (
      <span>
        {restTime.length > 1 ? (
          <span>
            <span className={s.warningColor}>{restTime[1]}</span> 天
          </span>
        ) : null}
        <span className={s.warningColor}> {restTime[0]}</span>
      </span>
    )
  }
}
