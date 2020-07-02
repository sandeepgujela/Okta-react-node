import React from 'react';
import {withAuth} from '@okta/okta-react';

export default withAuth(class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={user:null};
        this.getCurrentUser=this.getCurrentUser.bind(this);
    }

    async getCurrentUser(){
        this.props.auth.getUser().then(user=>{
            console.log('Profile page -> getCurrentUser()',user);
            this.setState({user});
        })
    }
 
    componentDidMount(){
        this.getCurrentUser()
    }

    render(){
        if(!this.state.user) {
            return <div>No user data yet !</div>;
        }
        return (<section>
            <h1>User Profile</h1>
            <div>
                <label>Name:</label>
                <span>{this.state.user}</span>
            </div>
        </section>
        )
    }
})
