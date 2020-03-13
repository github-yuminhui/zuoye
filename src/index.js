import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Nav from './components/Nav';
import Hot from './components/Hot';
import Bat from './components/Bat';
import Res from './components/Res';
import 'font-awesome/css/font-awesome.min.css';
import '@/styles/index.less';
import 'antd/dist/antd.css'

ReactDOM.render(
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Hot} />
        <Route path="/bat" component={Bat} />
        <Route path="/result" component={Res} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app'),
);
