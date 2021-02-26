import React,{useCallback,useState} from 'react';

import '../css/footer.css';

const Footer=(props)=>{
      const [x,SetX]=useState(0)

	  const versHaut=()=>{
	  	   SetX(0)
	  	  window.scroll(0,0)
	  }

	  
	    window.onscroll=()=>f()
	    
        const f=useCallback(()=>{
             const y= window.document.body.scrollTop || document.documentElement.scrollTop;
             const screenwith=window.screen.width;
             SetX(y)
             const header=document.getElementsByClassName('header')[0];
             const userMenu=document.getElementsByClassName('userMenu')[0];
             const versHaut=document.getElementsByClassName('versHaut')[0];
            if(600<screenwith){ 
                      if(userMenu)userMenu.style.transition='all 0.8s';
                      if(header) header.style.transition='all 0.6s';
                    
                     if(240<x){
                         
                         if(header)  header.style.background='red';
                      }else{
                        if(header)  header.style.background='black';
                      } 

                      if(78<=x){
                          if(userMenu){  userMenu.style.opacity=0;
                          	        userMenu.style.zIndex=-1;
                          	}
                      }else{
                          if(userMenu) { 
                             userMenu.style.opacity=1;
                             userMenu.style.zIndex=999;
                           }
                      } 
                      if(200<x){
                        if(versHaut)   versHaut.style.opacity=1;
                      }else{
                         if(versHaut)  versHaut.style.opacity=-1;
                      }
                     
            }else{
                if(200<x){
                        if(versHaut) {

                            versHaut.style.opacity=1;

                         }
                      }else{
                         if(versHaut)  versHaut.style.opacity=-1;
                      }

                }

        },[x])
	  
	 return ( 
	        <div className="footer">
	                <div className='versHaut'>
	                   <span onClick={()=>versHaut()}>
	                      <i className="fas fa-angle-up"></i>
	                    </span>
	                </div>
	             <div className="item">
	                  
	                   <div className='apropos'>
			                 <img src='/image/a.jpg' alt='images'/>
			                 <h2>A PROPOS DE NOUS</h2>
			                 <p>
			                     workhardcodding2021 qui vous propose des cours de programmation en  
			                      HTML, CSS, JAVASCRIPT, PHP, PYTHO, SQL, REACTJS ,C#, JAVA .
			                 </p>
			                 <div className='reseau'>
				                 <a href="www.twitter.com"><i className="fab fa-twitter"></i></a>
				                 <a href="www.instagram.com"> <i className="fab fa-instagram"></i></a>
				                 <a href="https://github.com/workhard2021"> <i className="fab fa-github-square"></i></a>
			                 </div> 

		               </div>
	             </div>

	             <div className='item condition'>
	                 <p>Copyright  <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2020 workhardcodding2021 tous droits réservés.<br/>
	                 <a href="/condition"> Termes et conditions d'utilisation</a>
	                 </p>
	             </div>
	            

	        </div>)
	      }

export default Footer;