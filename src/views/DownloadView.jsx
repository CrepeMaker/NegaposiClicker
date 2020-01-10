import React from 'react'
import { Accordion, Card, Button, FormControl } from 'react-bootstrap'
import { create } from '../utils/axios-api'
import styles from './DownloadView.scss'

class DownloadView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
    }

    this.api = create()
  }

  onChange(e) {
    const token = (e.target.value || '')
    this.setState({ token })
  }

  render() {
    const { token } = this.state

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

    return (
      <div>
        <h3>ダウンロード</h3>
        <FormControl
          placeholder="Download Token"
          onChange={this.onChange.bind(this)}
          value={token}
        />
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                文章一覧
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <pre>
                  <code>
                    SELECT id, sentence, reference FROM `sentences`
                  </code>
                </pre>
                <Button
                  href={`${baseURL}/api/download_data.php?type=csv&kind=sentences&token=${token}`}
                  download={'文章一覧.csv'}
                >
                  Download CSV
                </Button>
                <a
                  href={`${baseURL}/api/download_data.php?type=json&kind=sentences&token=${token}`}
                  download={'文章一覧.json'}
                >
                  Download JSON
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                回答一覧
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <pre>
                  <code>
                    SELECT id, sentence_id, respondent, class FROM `responces`
                  </code>
                </pre>
                <Button
                  href={`${baseURL}/api/download_data.php?type=csv&kind=responces&token=${token}`}
                  download={'回答一覧.csv'}
                >
                  Download CSV
                </Button>
                <Button
                  href={`${baseURL}/api/download_data.php?type=json&kind=responces&token=${token}`}
                  download={'回答一覧.json'}
                >
                  Download JSON
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                回答一覧 with 文章
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <pre>
                  <code>
                    SELECT responces.id, responces.class, sentences.id, sentences.sentence, sentences.reference FROM `responces`, `sentences` WHERE sentences.id = responces.sentence_id
                  </code>
                </pre>
                <Button
                  href={`${baseURL}/api/download_data.php?type=csv&kind=responceswithsentences&token=${token}`}
                  download={'回答一覧with文章.csv'}
                >
                  Download CSV
                </Button>
                <Button
                  href={`${baseURL}/api/download_data.php?type=json&kind=responceswithsentences&token=${token}`}
                  download={'回答一覧with文章.csv'}
                >
                  Download JSON
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default DownloadView