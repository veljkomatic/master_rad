import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendRecoveryEmail } from '../../../Redux/actionCreators';
import './Form.css'

class ForgotPassword extends PureComponent  {

    constructor() {
        super();
        this.state = {
            email: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleSubmit() {
        const { email } = this.state;
        this.props.sendRecoveryEmail(email);
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };
    
    render() {
        return(
            <div>
                <form className="Form" onSubmit={this.handleSubmit}>
                    <input className="Form__input" type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                    <button className="Form__button" type="submit">Send</button>
                </form>
                <Link style={styles.link} to="/">Remembered Account ?</Link>
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

export default connect(null, { sendRecoveryEmail })(ForgotPassword);
