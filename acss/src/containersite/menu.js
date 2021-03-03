import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import './css/menu.css';
const Menu=(props)=>{
      
        const [open,setOpen]=useState({toggle:false,serch:false,sign:false,login:false});
        const placeholder="Recherche ...";
        
      return<> <header>
             <nav>
                <div className="menu">
                
                       <Link to="/#" onClick={()=>setOpen((state)=>{ return {...state,toggle:!state.toggle,sign:false,login:false} })}>
                           <i className={!open.toggle?"fas fa-align-justify" : "fas fa-times"}></i>
                       </Link>
                       <Link to="/article/formation"> Formation</Link>
                       <Link to="/project/">Project </Link>
                       <Link to="/forum">Forum </Link>
                       { open.toggle && 

                       <div id="toggle">
                          <ul  id='categorie' className="sub_menu">
                             <span>Categorie</span>
                            <li><Link to={`/article/java`}>Java </Link></li>
                            <li><Link to={`/article/python`}>Python 1</Link></li>
                            <li><Link to={`/article/php`}>Php </Link></li>
                          </ul>

                          <ul  className="sub_menu">
                            <span>Recent</span>
                            <li><Link to=""><img src="/image/r1.jpg" alt="recent"/> java debutenat en php java script</Link></li>
                            <li><Link to=""><img src="/image/a.jpg" alt="recent"/> Python debutenat en php java script</Link></li>
                            <li><Link to=""><img src="/image/r1.jpg" alt="recent"/> Java debutenat en php java script</Link></li>
                            <li><Link to=""><img src="/image/a.jpg" alt="recent"/> php debutenat en php java script</Link></li>
                            <li><Link to=""><img src="/image/a.jpg" alt="recent"/> php debutenat en php java script</Link></li>             
                          </ul>
                         </div>
                       }
                    
                </div>

                <div className="menu logo">
                       <Link to="/formation/">apprendre & pratiquer</Link>
                       <Link to="/article/"> flexecode </Link>
                </div>
                { 1===1?
                 <div className="menu sign_login">
                    
                     <div id="sign_login">
                            <Link to="" id="icone">
                              <i className={!open.search?"fas fa-search" : "fas fa-times"}  onClick={()=>setOpen((state)=>{ return {...state,search:!state.search,login:false} })}></i>
                            </Link>
                            
                            <Link to="/user/sign" id={open.sign && "sign"} onClick={()=>setOpen((state)=>{ return {...state,sign:!state.sign,login:false}})}> 
                                 <i className="fas fa-user"></i>S'inscrire
                            </Link>
                            <Link to="/user/login" id={open.login && "login"}  onClick={()=>setOpen((state)=>{ return {...state,login:!state.login,sign:false} })}>
                                   Se connecter
                            </Link>
                      </div>
                    
                   </div>
                  :  <div className="connexion"> 
                            <i class="far fa-user"></i>
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
        <ul id="search_header">
               <li><Link to="">titre un comment faire la restaution d'un systeme d'exploitataion</Link></li>
               <li><Link to="">titre un comment faire la restaution d'un systeme d'exploitataion</Link></li>
        </ul>
       
       </>

}
export default Menu