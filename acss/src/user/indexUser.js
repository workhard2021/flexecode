import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Sign from './sign';
import Login from './login';
import ListeUser from './liste-user';
import PanelUser from './panelUser';
import Profil from './profil';
import UpdateProfil from './update-profil';

const IndexUser=(props)=>{
        
    return <>
             {/* <PanelUser/> */}
            <Switch>
                <Route exact path="/user/sign" render={(props)=><Sign  {...props} />}/>
                <Route exact path="/user/login" render={(props)=><Login  {...props} />}/>
                <Route exact path="/user/Liste-user" render={(props)=><ListeUser  {...props} />}/>
                <Route exact path="/user/profil/:id" render={(props)=><Profil  {...props} />}/>
                <Route exact path="/user/update-profil/:id" render={(props)=><UpdateProfil  {...props} />}/>
            </Switch>
        </>
}
export default IndexUser;