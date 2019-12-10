import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { SentenceCard, NegaposiButtons } from '../components'
import styles from './ClickerView.scss'

class ClickerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container>
        <SentenceCard
          id={1}
          sentence={"aaa"}
          reference={'ぐるなび'}
        />
        <NegaposiButtons />
      </Container>
    )
  }

}

export default ClickerView

