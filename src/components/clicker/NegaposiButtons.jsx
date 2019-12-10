import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import NegaposiEnums from './NagaposiEnums'
import styles from './SentenceCard.scss'

class NegaposiButtons extends React.Component {
  render() {
    const { onClick } = this.props

    return (
      <Container>
        <Row>
          <Col md={4}>
            <Button
              variant='success'
              block
              onClick={() => onClick(NegaposiEnums.POSITIVE)}
            >
              ポジティブ (p)
            </Button>
          </Col>
          <Col md={4}>
            <Button
              variant='dark'
              block
              onClick={() => onClick(NegaposiEnums.NEGATIVE)}
            >
              わからない (k)
            </Button>
          </Col>
          <Col md={4}>
            <Button
              variant='danger'
              block
              onClick={() => onClick(NegaposiEnums.UNKNOWN)}
            >
              ネガティブ (n)
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NegaposiButtons