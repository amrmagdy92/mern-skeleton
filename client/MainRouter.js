import React from 'react';
import { PrivateRoute ,Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/users';
import Signup from './user/Signup';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';

const MainRouter = function() {
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/users' component={Users}/>
                <Route path='/signup' component={Signup}/>
                <PrivateRoute  path='/users/:userID' component={EditProfile}/>
                <Route path='/user/:userID' component={Profile}/>
            </Switch>
        </div>
    )
};

export default MainRouter;