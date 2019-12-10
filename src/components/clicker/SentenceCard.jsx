import React from 'react'
import { Card } from 'react-bootstrap'
import styles from './SentenceCard.scss'

class SentenceCard extends React.Component {
  render() {
    const { id, sentence, reference } = this.props

    return (
      <Card className={styles.self}>
        <Card.Header>No. {id}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {sentence}
            </p>
            <footer className="blockquote-footer">
              {reference}
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    )
  }
}

export default SentenceCard