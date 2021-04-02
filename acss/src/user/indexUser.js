import React from 'react';
import {Route} from 'react-router-dom';
import Sign from './sign';
import Login from './login';
import ListeUser from './liste-user';
import Profil from './profil_';

const IndexUser=(props)=>{
         const {initUser,user}=props;
    return <>
             {user.role ==='admin' && user.connexion &&
               <>
                 <Route exact path="/user/Liste-user" render={(props)=><ListeUser  {...props} />}/>
               </>
             }

             {
                    user.connexion &&
                    <Route exact path="/user/profil/:id" render={(props)=><Profil user={user} initUser={initUser} {...props} />}/>
              }
                <Route exact path="/user/sign" render={(props)=><Sign  {...props}  />}/>
                <Route exact path="/user/login" render={(props)=><Login  initUser={initUser} {...props} />}/>
        
           </>
}
export default IndexUser;