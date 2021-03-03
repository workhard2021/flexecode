import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Sign from './sign';
import Login from './login';

const IndexUser=(props)=>{
        
    return  <Switch>
                <Route exact path="/user/sign" render={(props)=><Sign  {...props} />}/>
                <Route exact path="/user/login" render={(props)=><Login  {...props} />}/>
            </Switch>
}
export default IndexUser;