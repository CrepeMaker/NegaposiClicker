import React from 'react'
import { Form, Table } from 'react-bootstrap'
import { create } from '../utils/axios-api'
import { withRouter } from 'react-router'
import NegaposiEnums from '../components/clicker/NagaposiEnums'
import styles from './HistoryView.scss'

class HistoryView extends React.Component {
  constructor(props) {
    super(props)

    const name = localStorage.getItem('name') || ''

    this.state = {
      size: 200,
      offset: 0,
      name,
      all: 0,
      pages: [],
      responces: [],
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

    if (res && res.status === 200 && res.data) {
      const { items, all, offset } = res.data
      const pages = []
      for (let i = 0; i < res.data.all; i += size) {
        pages.push([i, Math.min(i + size, res.data.all)])
      }

      this.setState({ responces: items, all, offset, pages })
    }

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

  onChange(e) {
    this.setState({ offset: e.target.value }, async () => {
      await this.updateResponces()
    })
  }

  render() {
    const { responces, pages, offset, all } = this.state

    return (
      <div>
        <h3>回答履歴</h3>
        <Form.Control
          as="select"
          className={'float-right'}
          style={{ width: '25%' }}
          value={offset}
          onChange={this.onChange.bind(this)}
        >
          {
            pages && pages.map(page => (
              <option key={page[0]} value={page[0]}>
                {page[0] + 1}-{page[1]} / {all}
              </option>
            ))
          }
        </Form.Control>
        <div className={styles.self}>
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
        </div>
      </div>
    )
  }
}

export default withRouter(HistoryView)