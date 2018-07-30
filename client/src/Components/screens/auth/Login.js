import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Login extends PureComponent  {
    constructor() {
        super();
        this.state = {
          username: '',
          password: '',
        };
    
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(evt) {

      }
    
      handleUserChange(evt) {
        this.setState({
          username: evt.target.value,
        });
      };
    
      handlePassChange(evt) {
        this.setState({
          password: evt.target.value,
        });
      }

     render() {
        return(
            <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <label>Email</label>
              <input type="text" value={this.state.username} onChange={this.handleUserChange} />
    
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.handlePassChange} />
    
              <input type="submit" value="Log In" />
            </form>
          </div>
        );
    }
};

export default connect(null, { })(Login);
