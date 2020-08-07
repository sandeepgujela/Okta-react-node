import React from 'react';
import {ImplicitCallback,SecureRoute} from '@okta/okta-react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import appConfig from './app.config';
import RegistrationForm from './components/auth/RegistrationForm';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/shared/Navigation'
export default class App extends React.Component{
  render(){
    return (
      <>
      <div className="App">
        <Navigation />
        <main>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" render={()=><LoginPage baseUrl={appConfig.url} />} />
          <Route path="/registerSuccess" component={()=><h1>Thanks For registration</h1>} />
          

          {/* todo:try adding custom callback */}
          <Route path="/implicit/callback" component ={()=><h1>Successfull Login</h1>} /> 
          <Route path="/register" component={RegistrationForm} />
          {/* SecureRoute check if the user is authenticated then allow access to route */}
          <SecureRoute path='/profile' component={ProfilePage} />

        </main>
      </div>
      </>
    )
  }
}

