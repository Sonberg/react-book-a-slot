import {h, Component} from 'preact';
import {Router} from 'preact-router';
import style from './style';

import Header from './header';
import Home from 'async!../routes/home';
import Profile from 'async!../routes/profile';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://api.graph.cool/simple/v1/cja6gnslh1grc0123dkdwkdx7'}),
  cache: new InMemoryCache()
});

export default class App extends Component {
  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app" class={style.body}>
          <Header/>
          <Router onChange={this.handleRoute}>
            <Home path="/"/>
            <Profile path="/profile/" user="me"/>
            <Profile path="/profile/:user"/>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
