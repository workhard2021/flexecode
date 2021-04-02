import React, { useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import './css/menu.css';
const Menu=(props)=>{
      
        const [open,setOpen]=useState({toggle:false,serch:false,sign:false,login:false});
        const placeholder="Recherche ...";
        const [categorie,setCategorie]=useState([]);
        const [recent,setRecent]=useState([])
        const [success,setSuccess]=useState(false)
        const {user,initUser}=props;
        const history=useHistory();
        const url="/article/all/";
        
        const init=async ()=>{
                const res = await API.all(url);
                 if(res.error){
                       const ctg= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                       setCategorie(ctg);
                       setRecent(res.data.slice(0,5));
                       setSuccess(true)
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
              init()
        },[success])
 
      return<> <header>
             <nav>
                <div className="menu">
                
                       <Link to="/" onClick={()=>setOpen((state)=>{ return {...state,toggle:!state.toggle,sign:false,login:false} })}>
                           <i className={!open.toggle?"fas fa-align-justify" : "fas fa-times"}></i>
                       </Link>
                       <Link to="/" onClick={()=> setOpen(c=>{return{...c,toggle:false}})} > Formation</Link>
                       <Link to="/project/categorie" onClick={()=> setOpen(c=>{return{...c,toggle:false}})} >Project </Link>
                       <Link to="/forum" onClick={()=> setOpen(c=>{return{...c,toggle:false}})}>Forum </Link>
                       { open.toggle && 

                       <div id="toggle">
                          <ul  id='categorie' className="sub_menu">
                             <span>Categorie</span>
                             {categorie && categorie.map((value,index)=>{
                                 return <li key={index}><Link  onClick={()=> setOpen(c=>{return{...c,toggle:false}})}  to={`/article/categorie/${value.categorie}`}> {value.categorie}</Link></li>
                             })}

                          </ul>

                          <ul  className="sub_menu">
                            <span>Recent</span>
                            {recent && recent.map((value,index)=>{
                                 return <li key={index}><Link onClick={()=>setOpen(c=>{return{...c,toggle:false}})} to={`/article-view/${value._id}`}><img src={value.imageUrl} alt="recent"/> {value.title}</Link></li>
                             })}

                          </ul>
                         </div>
                       }
                    
                </div>

                <div className="menu logo">
                       <Link to="/">apprendre & pratiquer</Link>
                       <Link to="/"> flexecode </Link>
                </div>
                {  user ===null || user.connexion !==true ?
                 <div className="menu sign_login">
                    
                     <div id="sign_login">
                            <Link to="/" id="icone">
                              <i className={!open.search?"fas fa-search" : "fas fa-times"}  onClick={()=>setOpen((state)=>{ return {...state,search:!state.search,login:false} })}></i>
                            </Link>
                            
                            <Link to="/user/sign" id={open.sign? "sign" :''} onClick={()=>setOpen((state)=>{ return {...state,sign:!state.sign,login:false}})}> 
                                 <i className="fas fa-user"></i>S'inscrire
                            </Link>
                            <Link to="/user/login" id={open.login? "login":''}  onClick={()=>setOpen((state)=>{ return {...state,login:!state.login,sign:false} })}>
                                   Se connecter
                            </Link>
                      </div>
                    
                   </div>
                  :  <div className="connexion"> 
                        <Link to="/" id="icone">
                              <i className={!open.search?"fas fa-search" : "fas fa-times"}  onClick={()=>setOpen((state)=>{ return {...state,search:!state.search,login:false} })}></i>
                       </Link>
                        <Link to={`/user/profil/${user._id}`}> { user.imageUser? <img src={user.imageUser} alt="logo"/>:<i className="far fa-user"></i>}</Link>
                        <Link to="/user/login" id={open.login? "login":''}  onClick={()=>logOut()}>deconnexion</Link>
                     </div>
                  }
               
                  { open.search &&
                 <form className="menu" >
                   <input type="text" placeholder={placeholder} />
                    <button><i className="fas fa-search"></i></button>
                 </form>
                }
             </nav>
           
        </header>
        {/* <ul id="search_header">
               <li><Link to="">titre un comment faire la restaution d'un systeme d'exploitataion</Link></li>
               <li><Link to="">titre un comment faire la restaution d'un systeme d'exploitataion</Link></li>
        </ul> */}
       
       </>

}
export default Menu