import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { loginUser } from '../../../Redux/actionCreators';
import './Form.css'

class Login extends PureComponent  {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit() {
        const { email, password } = this.state;
        this.props.loginUser(email, password);
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

     render() {
        return(
            <div>
                <form className="Form" onSubmit={this.handleSubmit}>
                    <input className="Form__input" type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                    <input className="Form__input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
                    <button className="Form__button" type="submit">Login</button>
                </form>
                <Link style={styles.link} to="/forgot">Forgot Password</Link>
                <Link style={styles.link} to="/register">Don't have account ?</Link>
            </div>
        );
    }
};

const styles = {
    link: {
        color: 'white',
        margin: '0 auto',
        maxWidth: '592px',
        padding: '20px',
        display: 'flex',
        alignContent: 'center'
    }
}

export default connect(null, { loginUser })(Login);
