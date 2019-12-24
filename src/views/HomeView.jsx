import React from 'react'
import { withRouter } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './HomeView.scss'
import { StartButton } from '../components'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  start(name) {
    if (name)
      this.props.history.push('/clicker')
  }

  render() {
    return (
      <Container className={styles.self}>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <StartButton onClick={this.start.bind(this)} />
          </Col>
        </Row>
      </Container >
    )
  }
}

export default withRouter(HomeView)