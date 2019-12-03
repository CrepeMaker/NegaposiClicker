import React from 'react'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.self}>
        HomeView
      </div>
    )
  }
}

export default HomeView