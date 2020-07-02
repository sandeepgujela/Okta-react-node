import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(
    class Navigation extends React.Component{
        constructor(props){
            super(props);
            this.state={authenticated:null}
            this.checkAuthentication = this.checkAuthentication.bind(this);
            this.checkAuthentication();
        }
        async checkAuthentication(){
            const authenticated = await this.props.auth.isAuthenticated();
            if(authenticated !== this.state.authenticated){
                this.setState({authenticated})
            }
        }

        componenetDidUpdate(){
            this.checkAuthentication();
        }

        render(){
            if(this.state.authenticated === null){
                console.log('Navigation Component Render: User not authenticated')
                return null;
            }
            
            const authNav=this.state.authenticated ? (
                <ul className="auth-nav">
                    <li>
                        <a href="javascript:void(0)" onClick={()=>this.props.auth.logout()}>Logout</a>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            ):(
                <ul className="auth-nav">
                    <li>
                        <a href="javascript:void(0)" onClick={()=>this.props.auth.login()}>Login</a>
                    </li>
                    <li>
                        <Link  to="/register">Register</Link>
                    </li>
                </ul>

            );
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to="/"><h1>Home</h1></Link>
                        </li>
                        {authNav}
                    </ul>
                </nav>
            )
        }

    }
)
