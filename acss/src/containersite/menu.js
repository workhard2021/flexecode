import React, { useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import './css/menu.css';
import Search from '../containersite/search';
const Menu=(props)=>{
      
        const [open,setOpen]=useState({toggle:false,search:false,sign:false,login:false});
        const [categorie,setCategorie]=useState([]);
        const [recent,setRecent]=useState([])
        const [success,setSuccess]=useState(false);
        const [message,setMessage]=useState('');
        const {user,initUser}=props;
        const history=useHistory();
        const url="/article/all/";
        
        const init=async ()=>{
                const res = await API.all(url);
                 if(res.error){
                       const ctg= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                       setCategorie(ctg);
                       setRecent(res.data.slice(0,5));
                      
                 }
        }

        const logOut= async ()=>{
             
              const res=await API.deconnexionDeni(`/user/deconnexion/${user._id}`);
              if(res.error){
                     
                     localStorage.removeItem('user')
                     history.push('/');
                     initUser({})
              }

            }
      
        useEffect(()=>{
              setSuccess(true)
              init()
              return ()=>  setSuccess(true);
        },[success])

 
      return<> <header>
   
     { open.toggle && 

    <div id="toggle">
       
   <ul  id='categorie' className="sub_menu">
      <li className="suggestion">Categorie</li>
      {categorie && categorie.map((value,index)=>{
          return <li key={index}><Link  onClick={()=> setOpen(c=>{return{...c,toggle:false}})}  to={`/article/categorie/${value.categorie}`}> {value.categorie}</Link></li>
      })}

   </ul>
     <hr/>
   <ul  className="sub_menu">
     <li className="suggestion">Recent</li>
     {recent && recent.map((value,index)=>{
          return <li key={index}><Link onClick={()=>setOpen(c=>{return{...c,toggle:false}})} to={`/article-view/${value._id}`}><img src={value.imageUrl} alt="recent"/> {value.title}</Link></li>
      })}

   </ul>
  </div>
}


             { open.search &&
                    <div className="search_menu">
                     <Search setOpen={setOpen}  success={success} setSuccess={setSuccess} setMessage={setMessage} visibilite={true} url='/article/search'/>
                     <div className='invalid'> {message}</div>
                   </div>
              }
             <nav> 
                <div className="menu menu_1">
                       <span id="span_menu" onClick={()=>setOpen((state)=>{ return {...state,toggle:!state.toggle,sign:false,login:false} })}>
                           <i className={!open.toggle?"fas fa-align-justify" : "fas fa-times"}></i>
                       </span>
                       <Link onClick={()=> setOpen(c=>{return{...c,toggle:false}})} to="/"> Accueil</Link>
                       <Link to="/project/categorie" onClick={()=> setOpen(c=>{return{...c,toggle:false}})} >Project </Link>
                </div>

                <div className="menu logo">
                       <Link to="/">apprendre & pratiquer</Link>
                       <Link  to="/"> flexecode </Link>
                      {!open.search &&
                        <span  id="icone">
                              <i className={!open.search?"fas fa-search" : "fas fa-times"}  onClick={()=>setOpen((state)=>{ return {...state,search:!state.search,login:false} })}></i>
                          </span>
                      }
                 
                </div>

                 <div className="menu sign_login">
                 {  user ===null || user.connexion !==true ? 
                     <>
                            <Link to="/user/sign" id={open.sign? "sign" :''} onClick={()=>setOpen((state)=>{ return {...state,sign:!state.sign,login:false}})}> 
                                 <i className="fas fa-user"></i>S'inscrire
                            </Link>
                            <Link to="/user/login" id={open.login? "login":''}  onClick={()=>setOpen((state)=>{ return {...state,login:!state.login,sign:false} })}>
                                <i className="fas fa-user"></i>  Se connecter
                            </Link>
                     </>
       
                :
                 <>
                 <Link to={`/user/profil/${user._id}`}> { user.imageUser? <img src={user.imageUser} alt="logo"/>:<i className="far fa-user"></i>}</Link>
                 <span  onClick={()=>logOut()}>Deconnexion</span>
                  </>
                }

                </div>
                  
             </nav>
           
        </header>
  
       </>

}
export default Menu