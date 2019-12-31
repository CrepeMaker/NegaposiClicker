import React from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import NegaposiEnums from './NagaposiEnums'
import styles from './NegaposiButtons.scss'

class NegaposiButtons extends React.Component {
  render() {
    const { onClick, busy } = this.props

    return (
      <Container>
        <Row>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='success'
              block
              onClick={() => onClick(NegaposiEnums.POSITIVE)}
              disabled={busy}
            >
              {busy && (<Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />)}
              ポジティブ (p)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='dark'
              block
              onClick={() => onClick(NegaposiEnums.NEITHER)}
              disabled={busy}
            >
              {busy && (<Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />)}
              どちらともいえない (k)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='danger'
              block
              onClick={() => onClick(NegaposiEnums.NEGATIVE)}
              disabled={busy}
            >
              {busy && (<Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />)}
              ネガティブ (n)
            </Button>
          </Col>
          <Col md={3}>
            <Button
              className={styles.button}
              variant='secondary'
              block
              onClick={() => onClick(NegaposiEnums.INCOMPREHENSIBLE)}
              disabled={busy}
            >
              {busy && (<Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />)}
              理解不能 (Space)
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NegaposiButtons