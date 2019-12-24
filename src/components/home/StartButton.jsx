import React from 'react'
import { FormControl, Button } from 'react-bootstrap'
import styles from './StartButton.scss'

class StartButton extends React.Component {
  constructor(props) {
    super(props)
    const name = localStorage.getItem('name') || ''
    this.state = {
      name,
    }
  }

  onClick() {
    const { onClick } = this.props
    const { name } = this.state
    localStorage.setItem('name', name || '')

    if (onClick) onClick(name)
  }

  onChange(e) {
    const name = (e.target.value || '').toLowerCase()
    this.setState({ name })
  }

  render() {
    const { name } = this.state

    return (
      <div>
        <FormControl
          placeholder="Username"
          onChange={this.onChange.bind(this)}
          value={name}
        />
        <Button
          className={styles.button}
          size='lg'
          block
          onClick={this.onClick.bind(this)}
        >
          Start
        </Button>
      </div>
    )
  }
}

export default StartButton