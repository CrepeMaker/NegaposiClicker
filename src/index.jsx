import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView, ClickerView, InfoView } from './views'
import { TopBar } from './components'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

render(
  <div>
    <BrowserRouter>
      <div>
        <TopBar />
        <Container>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/clicker" component={ClickerView} />
          <Route exact={true} path="/info" component={InfoView} />
        </Container>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('app')
);