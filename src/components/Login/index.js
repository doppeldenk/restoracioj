import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.state[name] = value;
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-center">
        <h1>Login</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <br />
          <button className="btn btn-success" type="submit">Ingresar</button>
        </form>
      </div>
    );
  }
}

export default Login;
