import React from 'react';
import { Card, Row, Col, Spin, Button } from 'antd';
import axios from 'axios';
import { hot } from 'react-hot-loader/root';
import { NavLink, Link } from 'react-router-dom';


class Res extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: {},
            data2: {}
        };
    }

    componentDidMount() {
        const { player1, player2 } = this.props.location.query
        const url1 = `https://api.github.com/users/${player1}`;
        const url2 = `https://api.github.com/users/${player2}`;
        axios.get(url1).then((res) => {
            this.setState({
                data1: res.data
            })
        });
        axios.get(url2).then((res) => {
            this.setState({
                data2: res.data
            })
        });

    }

    render() {
        const { data1, data2 } = this.state
        console.log(data1, data2);
        const card = { textAlign: 'center', margin: '0 20px', backgroundColor: 'rgb(235, 235, 235)', borderRadius: 25, fontSize: 25, fontWeight: 'bold' }

        return (
            <div style={{ textAlign: 'center' }}>
                <Row type="flex" justify="center" gutter={24} >
                    {
                        data1 &&
                        <Card style={card}>
                            <p>{data1.public_repos > data2.public_repos ? 'Winner' : 'Loser'}</p>
                            <img style={{ width: 200, height: 200 }} src={data1.avatar_url} />
                            <p>Scores: {data1.public_repos}</p>
                            <p>{data1.name}</p>
                        </Card>
                    }
                    {data2 &&
                        <Card style={card}>
                            <p>{data2.public_repos > data1.public_repos ? 'Winner' : 'Loser'}</p>
                            <img style={{ width: 200, height: 200 }} src={data2.avatar_url} />
                            <p>Scores: {data2.public_repos}</p>
                            <p>{data2.name}</p>
                        </Card>
                    }

                </Row>
                <Button type="primary" size='large' style={{ marginTop: 20 }}>
                    <Link to={{ pathname: '/Bat' }}>Reset</Link>
                </Button>
            </div>
        )
    }

}

export default hot(Res);
