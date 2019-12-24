import React from 'react'
import { Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class TopBar extends React.Component {
  render() {
    const name = localStorage.getItem('name') || ''

    return (
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to='/'>
          ネガポジ クリッカー
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {name}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default withRouter(TopBar)