// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Card, Row, Col, Spin } from 'antd';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';



class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: props.current };
  }

  onClick(query) {
    const { onClick } = this.props;
    this.setState({ current: query });
    onClick(query);
  }

  render() {
    const { links } = this.props;
    const { current } = this.state;
    return (
      <Row type="flex" justify="center" gutter={18} style={{ fontSize: 18 }}>
        {
          links.map((item, key) => (
            <Col
              key={key}
            >
              <a
                href="#"
                onClick={() => this.onClick(item.query)}
                className={current === item.query ? 'active' : ''}
              >
                {item.title}
              </a>
            </Col>))
        }
      </Row>
    );
  }
}

class List extends React.Component {
  render() {
    const { index, list, loading } = this.props;
    return (
      <Card
        loading={loading}
        style={{ backgroundColor: 'rgb(235, 235, 235)', marginBottom: '10px', borderRadius: 25, textAlign: 'center' }}
      >
        <div style={{ paddingRight: '24px' }}>
          <h2>#{index}</h2>
          <div>
            <img style={{ width: '50%' }} src={list.owner.avatar_url} />
          </div>
          <h4
            style={{ fontSize: 24 }}
          >
            {list.owner.login}
          </h4>
        </div>
        <div style={{ fontSize: 18 }}>
          <p>
            <i
              className="fa fa-user"
              style={{
                color: 'orange',
                marginRight: 10
              }}
            />
            {list.owner.login}
          </p>
          <p>
            <i
              className="fa fa-star"
              style={{
                color: 'yellow',
                marginRight: 10
              }}
            />
            {list.stargazers_count} stars
        </p>
          <p>
            <i
              className="fa fa-code-fork"
              style={{
                color: 'blue',
                marginRight: 10
              }}
            />
            {list.forks} forks
        </p>
          <p>
            <i
              className="fa fa-exclamation-triangle"
              style={{
                color: 'pink',
                marginRight: 10
              }}
            />
            {list.open_issues} open issues
        </p>
        </div>

      </Card>
    );
  }
}

class Hot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      end: false,
      page: 1,
      items: [],
    };
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.search(true);
    }
  }

  search = async (clear = false) => {
    const { query } = this.props;
    const page = clear ? 1 : this.state.page;

    this.setState({ loading: true });
    if (clear) {
      this.setState({ items: [] });
    }
    try {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&type=Repositories&page=${page}`,
      );
      this.setState((state) => ({
        items: clear ? res.data.items : [...state.items, ...res.data.items],
        page: clear ? 1 : state.page + 1,
      }));
    } catch (error) {
      this.setState({
        end: true,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    const { onClick, current } = this.props;
    const { items, loading, end } = this.state;
    const links = [
      {
        title: 'All',
        query: 'stars:>1',
      },
      {
        title: 'JavaScript',
        query: 'stars:>1+language:javascript',
      },
      {
        title: 'Ruby',
        query: 'stars:>1+language:ruby',
      },
      {
        title: 'Java',
        query: 'stars:>1+language:java',
      },
      {
        title: 'CSS',
        query: 'stars:>1+language:css',
      },
    ];
    return (
      <div>
        <Row style={{ marginBottom: 20 }} type="flex" justify="center">
          <Nav onClick={onClick} current={current} links={links} />
        </Row>
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => this.search(false)}
          hasMore={!loading || end}
          loader={null}
        >
          <Row type="flex" justify="center" gutter={18}>
            {items.map((item, key) => (
              <Col span={5}>
                <List loading={loading} key={key} list={item} index={key + 1} />
              </Col>
            ))}
          </Row>
          {loading && (
            <div style={{ textAlign: 'center', marginTop: 15 }}>
              <Spin size="large" spinning={loading} tip="Loading..." />
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'stars:>1',
    };
  }

  onClick = (query) => {
    this.setState({
      query,
    });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <Hot query={query} current={query} onClick={this.onClick} />
      </div>
    );
  }
}

export default App;
