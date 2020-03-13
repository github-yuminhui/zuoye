// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { NavLink, Link } from 'react-router-dom';

import axios from 'axios';
import { hot } from 'react-hot-loader/root';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      click: true,
      data: {}
    };
  }

  onClick = () => {
    const { username } = this.state;
    if (username === '') return;
    const url = `https://api.github.com/search/users?q=${username}`;
    axios.get(url).then((res) => {
      const data = res && res.data.items[0]
      this.setState({
        data,
        click: false,
      }, () => {
        this.props.getPlayers(username)
      })
    });
  };

  close = () => {
    this.setState({ click: true, username: '' }, () => {
      this.props.getPlayers(this.state.username)
    });
  }

  onChange = (e) => {
    this.setState({ username: e.target.value })
  }

  render() {
    const { click, data } = this.state
    return (
      <>
        {
          click ? <>
            <Input onChange={this.onChange} style={{ width: '80%', marginRight: 20, height: 40 }} />
            <Button type="primary" size='large' onClick={this.onClick} >submit</Button>
          </> : <div style={{ borderRadius: 10, backgroundColor: '#dfdfdf', width: '100%', height: 100 }}>
              <img style={{
                borderRadius: 16,
                width: 64,
                height: 64,
                margin: 20,
                verticalAlign: 'top'
              }} src={data.avatar_url} /><span style={{ fontSize: 50, lineHeight: '100px' }}>{data.login}</span>
              <i onClick={() => this.close()} className="fa fa-close" style={{ fontSize: 30, color: 'red', float: 'right', marginRight: 25, lineHeight: '100px', cursor: 'pointer' }} />
            </div>
        }
      </>
    )
  }
}

class Instructions extends React.Component {
  render() {
    const icon = {
      backgroundColor: '#eee',
      fontSize: '120px',
      padding: '32px',
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Instructions</h2>
        <Row type="flex" justify="center" gutter={24} >
          <Col>
            <p style={{ fontSize: 24 }}>Enter two Github</p>
            <div>
              <i className="fa fa-users" style={{ ...icon, color: 'rgba(255,191,116)' }} />
            </div>
          </Col>
          <Col>
            <p style={{ fontSize: 24 }}>Battle</p>
            <div>
              <i className="fa fa-fighter-jet" style={{ ...icon, color: 'gray' }} />
            </div>
          </Col>
          <Col>
            <p style={{ fontSize: 24 }}>See the winner</p>
            <div>
              <i className="fa fa-trophy" style={{ ...icon, color: ' gold' }} />
            </div>
          </Col>
        </Row>
        <h3 style={{ fontSize: 24 }}>players</h3>
      </div>
    );
  }
}



class Bat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: '',
      player2: '',
    };
  }

  playerOne = (player1) => {
    this.setState({
      player1
    })
  }

  playerTwo = (player2) => {
    this.setState({
      player2
    })
  }


  toRes = () => {
    this.props.history.push(
      {
        pathname: '/Bat/result',
        //  state: {
        //  names:'one'
        // }
      }
    )
  }

  render() {
    const { player1, player2 } = this.state;
    console.log(player1, player2);


    return (
      <div style={{ textAlign: 'center' }}>
        <Instructions />
        <Row type="flex" justify="center" gutter={24} >
          <Col span={9}>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>Player One</p>
            <Players getPlayers={this.playerOne.bind(this)} />

          </Col>
          <Col span={9}>
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>Player Two</p>

            <Players getPlayers={this.playerTwo.bind(this)} />
          </Col>
        </Row>
        {
          player1 !== '' && player2 !== ''
            ? <Button type="primary" size='large' style={{ marginTop: 20 }}>
              <Link to={{ pathname: '/result', query: { player1, player2 } }}>Battle</Link>
              {/* <NavLink to="/result">Battle</NavLink> */}
            </Button> : ''
        }
      </div>
    );
  }
}

export default hot(Bat);
