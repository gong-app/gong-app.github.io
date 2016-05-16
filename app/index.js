import React from 'react';
import ReactDOM from 'react-dom';
import Api from './api'

var API = new Api();

var homies = {
  1: {name: 'Kelvin'},
  2: {name: 'Ford'},
  3: {name: 'Daniel'}
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    for (var key in homies) {
      homies[key].isSelected = false;
    }
    this.state = {
      homies,
      selected: []
    };
    this.select = this.select.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.gong = this.gong.bind(this);
  }
  select(homieId) {
    var { state } = this;
    state.homies[homieId].isSelected = !state.homies[homieId].isSelected;
    this.setState(state);
  }
  login(data) {
    API.login(data)
      .catch(e => {
        this.setState({incorrectPassword: true});
        alert(e);
      });
  }
  register(data) {
    console.log(data);
  }
  gong() {
    API.gong(this.state.selected);
  }
  render() {
    return <div>
      <RegisterForm register={this.register} />
      <hr/>
      <LoginForm login={this.login}/>
      <hr/>
      <HomieList select={this.select} homies={homies}/>
      <hr/>
      <Gong gong={this.gong}/>
     </div>;
  }
}

class HomieList extends React.Component {
  render() {
    var { homies, select } = this.props;
    homies = Object.keys(homies).map(h => {
      homies[h].id = h;
      return homies[h];
    });
    return <div>
      <div>Homies</div>
      <ul>
        {homies.map(h => <li key={h.id}>
          <div onClick={select.bind(this, h.id)} className={`${h.isSelected ? 'invert' : 'hover-invert'}`}>{h.name}</div>
        </li>)}
      </ul>
    </div>;
  }
}

class Gong extends React.Component {
  render() {
    return <div>
      <button onClick={this.props.gong}>GONG</button>
    </div>;
  }
}

class LoginForm extends React.Component {
  login() {
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    this.props.login({ username, password });
  }
  render() {
    return <div>
      <div>Login</div>
      <label>username</label>
      <input ref='username' type='text'/>
      <label>password</label>
      <input ref='password' type='text'/>
      <button onClick={this.login.bind(this)}>login</button>
    </div>
  }
}

class RegisterForm extends React.Component {
  register() {
    var email = this.refs.email.value;
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    this.props.register({ email, username, password });
  }
  render() {
    return <div>
      <div>Register</div>
      <label>email</label>
      <input ref='email' type='text'/>
      <label>username</label>
      <input ref='username' type='text'/>
      <label>password</label>
      <input ref='password' type='text'/>
      <button onClick={this.register.bind(this)}>register</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
