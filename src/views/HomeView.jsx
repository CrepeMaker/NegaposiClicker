import React from 'react'
import { withRouter } from 'react-router'
import { Button, Jumbotron } from 'react-bootstrap'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  start() {
    this.props.history.push('/clicker')
  }

  render() {
    return (
      <div className={styles.self}>
        <div className='mx-auto'>
          <Button
            size='lg'
            onClick={this.start.bind(this)}
          >
            Start
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(HomeView)