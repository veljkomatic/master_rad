import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { registerUser } from '../../../Redux/actionCreators';
import './Form.css'

class Register extends PureComponent  {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit() {
        const { firstName, lastName, email, password } = this.state;
        this.props.registerUser(firstName, lastName, email, password);
    }

    handleFirstNameChange(evt) {
        this.setState({
            firstName: evt.target.value,
        });
    }

    handleLastNameChange(evt) {
        this.setState({
            lastName: evt.target.value,
        });
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
                    <input className="Form__input" type="text" placeholder="First Name" ref={(firstName) => this.firstName = firstName } />
                    <input className="Form__input" type="text" placeholder="Last Name" ref={(lastName) => this.lastName = lastName } />
                    <input className="Form__input" type="text" placeholder="Email" ref={(email) => this.email = email } />
                    <input className="Form__input" type="text" placeholder="Password" ref={(password) => this.password = password } />
                    <button className="Form__button" type="submit">Register</button>
                </form>
                <Link style={styles.link} to="/">Already have account ?</Link>
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

export default connect(null, { registerUser })(Register);
