import React from 'react';
import {Route} from 'react-router-dom';
import Sign from './sign';
import Login from './login';
import ListeUser from './liste-user';
import PanelUser from './panelUser';
import Profil from './profil';
import UpdateProfil from './update-profil';

const IndexUser=(props)=>{
         const {initUser}=props;
    return <>
                <PanelUser/> 
                <Route exact path="/user/sign" render={(props)=><Sign  {...props}  />}/>
                <Route exact path="/user/login" render={(props)=><Login  initUser={initUser} {...props} />}/>
                <Route exact path="/user/Liste-user" render={(props)=><ListeUser  {...props} />}/>
                <Route exact path="/user/profil/:id" render={(props)=><Profil initUser={initUser}  {...props} />}/>
                <Route exact path="/user/update-profil/:id" render={(props)=><UpdateProfil initUser={initUser} {...props} />}/>
        
           </>
}
export default IndexUser;