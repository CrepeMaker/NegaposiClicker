import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class TopBarLink extends React.Component {
  render() {
    const { to, title } = this.props

    const path = location.pathname

    return (
      <Nav.Item
        className={to === path && 'active'}
      >
        <Nav.Link
          as={Link}
          to={to}
        >
          {title}
        </Nav.Link>
      </Nav.Item>
    )
  }
}

export default withRouter(TopBarLink)