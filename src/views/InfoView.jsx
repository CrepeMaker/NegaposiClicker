import React from 'react'
import { Container, Row, Col, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { create } from '../utils/axios-api'
import styles from './InfoView.scss'

class InfoView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.api = create()
  }

  async componentDidMount() {
    const res = await this.api.get('api/get_info.php', {
      params: {
        token: 'g264t3sx65cw9mwiedyf4my9a',
      }
    })

    if (res && res.status === 200 && res.data)
      this.setState(res.data)
  }

  static Bar({ id, num, all, variant }) {
    return (
      <Row>
        <Col md={2}>
          {id}
        </Col>
        <Col md={10}>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{`${id}: ${num}/${all}`}</Tooltip>}
          >
            <ProgressBar
              animated
              variant={variant}
              now={num * 100 / all}
              label={`${num}/${all}`}
            />
          </OverlayTrigger>
        </Col>
      </Row>
    )
  }

  render() {
    const { all, ok, users } = this.state

    return (
      <div>
        <h3>進捗</h3>
        <Container className={styles.self}>
          {
            users && users.map(user => (
              <InfoView.Bar
                key={user.id}
                id={user.id}
                num={user.num}
                all={all}
                variant='info'
              />
            ))
          }
          <InfoView.Bar
            id={'回答数 >= 2'}
            num={ok}
            all={all}
            variant='success'
          />
        </Container>
      </div>
    )
  }
}

export default InfoView