import React, { useState} from 'react';
import './css/menu.css';
const Menu=(props)=>{
      
        const [open,setOpen]=useState({toggle:false,serch:false,sign:false,login:false});
        const placeholder="Recherche ...";
        
      return <header>
             <nav>
                <div className="menu">
                
                       <a href="#" onClick={()=>setOpen((state)=>{ return {...state,toggle:!state.toggle,sign:false,login:false} })}>
                              <i className={!open.toggle?"fas fa-align-justify" : "fas fa-times"}></i>
                       </a>
                       <a href="#"> Formation</a>
                       <a href="#">Project </a>
                       <a href="#">Forum </a>
                       { open.toggle && 

                       <div id="toggle">
                          <ul  id='categorie' className="sub_menu">
                             <span>Categorie</span>
                            <li><a href="">Java </a></li>
                            <li><a href="">Python 1</a></li>
                            <li><a href="">Php </a></li>
                          </ul>

                          <ul  className="sub_menu">
                            <span>Recent</span>
                            <li><a href=""><img src="/image/r1.jpg" alt="recent"/> java debutenat en php java script</a></li>
                            <li><a href=""><img src="/image/a.jpg" alt="recent"/> Python debutenat en php java script</a></li>
                            <li><a href=""><img src="/image/r1.jpg" alt="recent"/> Java debutenat en php java script</a></li>
                            <li><a href=""><img src="/image/a.jpg" alt="recent"/> php debutenat en php java script</a></li>
                            <li><a href=""><img src="/image/a.jpg" alt="recent"/> php debutenat en php java script</a></li>             
                          </ul>
                         </div>
                       }
                    
                </div>

                <div className="menu logo">
                       <a href="#">apprendre & pratiquer</a>
                       <a href="#"> flexecode </a>
                </div>
               
                <div className="menu sign_login">
               
                      <div id="sign_login">
                            <a href="#">
                              <i className={!open.search?"fas fa-search" : "fas fa-times"}  onClick={()=>setOpen((state)=>{ return {...state,search:!state.search,login:false} })}></i>
                            </a>
                            
                            <a href="#" id={open.sign && "sign"} onClick={()=>setOpen((state)=>{ return {...state,sign:!state.sign,login:false} })}> 
                                 <i className="fas fa-user"></i>S'inscrire
                            </a>
                            <a href="#" id={open.login && "login"}  onClick={()=>setOpen((state)=>{ return {...state,login:!state.login,sign:false} })}>
                                   Se connecter
                            </a>
                      </div>
                      
                </div>
                { open.search &&
                 <form className="menu" >
                   <input type="text" placeholder={placeholder} />
                    <button><i className="fas fa-search"></i></button>
                 </form>
                }
             </nav>
           
        </header>   
}
export default Menu