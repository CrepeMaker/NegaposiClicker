import React from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import { create } from '../utils/axios-api'
import NegaposiEnums from '../components/clicker/NagaposiEnums'
import styles from './HistoryView.scss'

class HistoryView extends React.Component {
  constructor(props) {
    super(props)

    const name = localStorage.getItem('name') || ''

    this.state = {
      size: 20,
      offset: 0,
      name,
    }

    this.api = create()
  }

  async updateResponces() {
    const { size, offset, name } = this.state

    const res = await this.api.get('api/get_history.php', {
      params: {
        token: 'g264t3sx65cw9mwiedyf4my9a',
        name,
        size,
        offset,
      }
    })

    if (res && res.status === 200 && res.data)
      this.setState({ responces: res.data })
  }

  async componentDidMount() {
    await this.updateResponces()
  }

  async update(id, negaposi) {
    const { name } = this.state

    const res = await this.api.post('api/update_responce.php', {
      token: 'g264t3sx65cw9mwiedyf4my9a',
      id,
      name,
      class: negaposi,
    })

    if (res && res.status === 200) {
      await this.updateResponces()
    }
  }

  render() {
    const { responces } = this.state

    return (
      <div>
        <h3>回答履歴</h3>
        <Container className={styles.self}>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>文</th>
                <th>選択肢</th>
                <th>変更</th>
              </tr>
            </thead>
            <tbody>
              {
                responces && responces.map(responce => {
                  const classStr =
                    responce.class == NegaposiEnums.POSITIVE ? "ポジティブ" :
                      responce.class == NegaposiEnums.NEITHER ? "どちらともいえない" :
                        responce.class == NegaposiEnums.NEGATIVE ? "ネガティブ" :
                          responce.class == NegaposiEnums.INCOMPREHENSIBLE ? "理解不能" :
                            "---";

                  return (
                    <tr key={responce.id}>
                      <td>{responce.id}</td>
                      <td>{responce.sentence}</td>
                      <td>{classStr}</td>
                      <td>
                        <a onClick={() => this.update(responce.id, NegaposiEnums.POSITIVE)}>
                          ポジティブ
                        </a>,
                        <a onClick={() => this.update(responce.id, NegaposiEnums.NEITHER)}>
                          どちらともいえない
                        </a>,
                        <a onClick={() => this.update(responce.id, NegaposiEnums.NEGATIVE)}>
                          ネガティブ
                        </a>,
                        <a onClick={() => this.update(responce.id, NegaposiEnums.INCOMPREHENSIBLE)}>
                          理解不能
                        </a>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default HistoryView