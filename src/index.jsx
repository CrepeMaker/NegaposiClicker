import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView, ClickerView } from './views'
import { TopBar } from './components'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

render(
  <div>
    <HashRouter>
      <div>
        <TopBar />
        <Container>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/clicker" component={ClickerView} />
        </Container>
      </div>
    </HashRouter>
  </div>,
  document.getElementById('app')
);