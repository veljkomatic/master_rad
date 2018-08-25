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
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        await this.props.registerUser(firstName, lastName, email, password);
        if(!this.props.error) {
            this.props.history.push('/map');
        }
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
                    <input className="Form__input" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange}  />
                    <input className="Form__input" type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange}  />
                    <input className="Form__input" type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}  />
                    <input className="Form__input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
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

const mapStateToProps = ({ auth }) => ({
    error: auth.error,
});

export default connect(mapStateToProps, { registerUser })(Register);
