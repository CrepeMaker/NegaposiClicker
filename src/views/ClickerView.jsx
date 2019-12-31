import React from 'react'
import { withRouter } from 'react-router'
import { Container } from 'react-bootstrap'
import { Mutex } from 'await-semaphore'
import { create } from '../utils/axios-api'
import { SentenceCard, NegaposiButtons } from '../components'
import NegaposiEnums from '../components/clicker/NagaposiEnums'

class ClickerView extends React.Component {
  constructor(props) {
    super(props)
    const name = localStorage.getItem('name') || ''

    this.state = {
      id: -1,
      sentence: '',
      reference: '',
      offset: 0,
      size: 1,
      name,
    }

    if (!name) {
      this.props.history.push('/')
      return
    }

    this.api = create()

    this.mutex = new Mutex()
    this.sentList = new Set()
  }

  async getData() {
    const { size, name } = this.state

    const res = await this.api.get('api/get_sentences.php', {
      params: {
        token: 'g264t3sx65cw9mwiedyf4my9a',
        size,
        name,
      }
    })

    if (!res.data || !res.data.length) return {
      id: -1,
      sentence: '終わり',
      reference: '',
    }

    for (const item of res.data) {
      if (item.id >= 0) {
        return {
          id: item.id,
          sentence: item.sentence,
          reference: item.reference,
        }
      }
    }

    return {}
  }

  async next() {
    const res = await this.getData()
    this.setState(res)
  }

  async select(negaposi) {
    const { id: sentence_id, name } = this.state
    let class_id = -1

    switch (negaposi) {
      case NegaposiEnums.POSITIVE:
      case NegaposiEnums.NEGATIVE:
      case NegaposiEnums.NEITHER:
      case NegaposiEnums.INCOMPREHENSIBLE:
        class_id = negaposi
        break
      default:
        break
    }

    this.mutex.use(async () => {
      if (!this.sentList.has(sentence_id)) {
        if (sentence_id >= 0 && class_id != -1) {
          const res = await this.api.post('api/post_responces.php', {
            token: 'g264t3sx65cw9mwiedyf4my9a',
            respondent: name,
            data: [
              { sentence_id, class: class_id },
            ]
          })
        }
        this.sentList.add(sentence_id)
      }
    })

    await this.next()
  }

  async componentDidMount() {
    this.keyEventListener = (e) => {
      const keyName = e.key

      switch (keyName) {
        case 'p':
          this.select(NegaposiEnums.POSITIVE)
          break
        case 'k':
          this.select(NegaposiEnums.NEITHER)
          break
        case 'n':
          this.select(NegaposiEnums.NEGATIVE)
          break
        case ' ':
          this.select(NegaposiEnums.INCOMPREHENSIBLE)
          break
      }
    }

    window.addEventListener('keypress', this.keyEventListener)

    await this.next()
  }

  compoenentWillUnmount() {
    window.removeEventListener('keypress', this.keyEventListener)
  }

  render() {
    const { id, sentence, reference } = this.state

    const onClick = (negaposi) => {
      this.select(negaposi)
    }

    return (
      <Container>
        <SentenceCard
          id={id}
          sentence={sentence}
          reference={reference}
        />
        <NegaposiButtons
          onClick={onClick}
        />
      </Container>
    )
  }

}

export default withRouter(ClickerView)

