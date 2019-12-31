import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import NegaposiEnums from './NagaposiEnums'
import styles from './NegaposiButtons.scss'

class NegaposiButtons extends React.Component {
  render() {
    const { onClick } = this.props

    return (
      <Container>
        <Row>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='success'
              block
              onClick={() => onClick(NegaposiEnums.POSITIVE)}
            >
              ポジティブ (p)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='dark'
              block
              onClick={() => onClick(NegaposiEnums.NEITHER)}
            >
              どちらともいえない (k)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='danger'
              block
              onClick={() => onClick(NegaposiEnums.NEGATIVE)}
            >
              ネガティブ (n)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='secondary'
              block
              onClick={() => onClick(NegaposiEnums.INCOMPREHENSIBLE)}
            >
              理解不能 (Space)
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NegaposiButtons