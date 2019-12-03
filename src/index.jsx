import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView } from './views'
import { TopBar } from './components'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

render(
  <div>
    <HashRouter>
      <div>
        <TopBar />
        <Container>
          <Route exact={true} path="/" component={HomeView} />
        </Container>
      </div>
    </HashRouter>
  </div>,
  document.getElementById('app')
);