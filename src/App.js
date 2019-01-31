import React from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  handleOauth = () => {

    const clientId = `1055050058774-dgvo7nviv4bft89kckhaks6dlcobc5ei.apps.googleusercontent.com`

    const secret = `uK74x1uT37To57rDx9YAHtFn`
    const scope = `https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.metadata`

    const code =`https://fish-225908.firebaseapp.com/__/auth/handler?code=4/twDRijRqcyf5SPHj2_XgQtunMLBSriU5fQXat01CeQnnTd7-XiXXoHfiz-356p-IJhOJWMmH_cMGqwaaf1NUkd4&scope=https://www.googleapis.com/auth/gmail.metadata`

    const redirect =`	https://fish-225908.firebaseapp.com/__/auth/handler`

    const endpoint = `https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Ffish-225908.firebaseapp.com%2F__%2Fauth%2Fhandler&response_type=code&client_id=1055050058774-f8cpn57bia93q4npa2tn4d5fk6l7hk4q.apps.googleusercontent.com&scope=${scope}&approval_prompt=force`

    // curl -X POST -H "content-type: application/x-www-form-urlencoded" -d "grant_type=authorization_code&code=4/twDRijRqcyf5SPHj2_XgQtunMLBSriU5fQXat01CeQnnTd7-XiXXoHfiz-356p-IJhOJWMmH_cMGqwaaf1NUkd4&redirect_uri=https://fish-225908.firebaseapp.com/__/auth/handler&client_id=1055050058774-dgvo7nviv4bft89kckhaks6dlcobc5ei.apps.googleusercontent.com&client_secret=rwLIg3mBG7L52e1Op6eSEgtl" "https://accounts.google.com/o/oauth2/token"


    // curl -H "Authorization: Bearer access_token" "https://www.googleapis.com/gmail/v1/users/eMailAddress/messages"

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {/* <button onClick={() => this.handleOauth()}>connect Googles</button> */}
        </header>
      </div>
    );
  }
}





export default App;
