import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import config from '../../app.config';
import axios from 'axios';

export default withAuth(
    class RegistrationFormFe extends React.Component{
      axiosInstance;
        constructor(props) {
            super(props);
            this.state = {
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              sessionToken: null
            };
            this.oktaAuth = new OktaAuth({url:config.url});
            this.checkAuthentication = this.checkAuthentication.bind(this);
            this.checkAuthentication();
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
            this.handleLastNameChange = this.handleLastNameChange.bind(this);
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
        }
        async checkAuthentication(){
            const sessionToken= await this.props.auth.getIdToken();
            if(sessionToken){
                this.setState({sessionToken});
            }
        }

        componentDidUpdate() {
            this.checkAuthentication();
        }
        handleFirstNameChange(e){
            this.setState({firstName:e.target.value});
        }
        handleLastNameChange(e) {
            this.setState({ lastName: e.target.value });
        }
        handleEmailChange(e) {
        this.setState({ email: e.target.value });
        }
        handlePasswordChange(e) {
        this.setState({ password: e.target.value });
        }

        axiosInstance = axios.create({
          baseURL: `${config.url}/api/v1`,
          timeout: 2000,
          headers: {'Authorization': config.authorisation}
        });

        handleSubmit(e) { 
            const newUser = {
                profile: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    login: this.state.email
                },
                credentials: {
                  password : { "value": "Test@123" }
                }
            };
            this.axiosInstance.post('/users?activate=true&sendEmail=true', newUser)
            .then(function (response) {
              console.log('axios',response);
            })
            .catch(function (error) {
              console.log('axios error',error);

            });
            e.preventDefault();
        }

        render() {
            if (this.state.sessionToken) {
              this.props.auth.redirect({ sessionToken: this.state.sessionToken });
              return null;
            }
      
            return (
              <form onSubmit={this.handleSubmit}>
                <div className="form-element">
                  <label>Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="form-element">
                  <label>First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange}
                  />
                </div>
                <div className="form-element">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange}
                  />
                </div>
                <div className="form-element">
                  <label>Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <input type="submit" id="submit" value="Register" />
              </form>
            );
          }
        }
      );
