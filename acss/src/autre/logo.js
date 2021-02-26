import React from 'react';
import '../css/logo.css'
const Logo=(props)=>{
       const {title_1,title_2,image}=props;
       const scrollPage=(y=null)=>{
              
              let screenWidth=window.screen.width;
              
              setTimeout(function() {
                       
                       window.scroll(0,screenWidth-200)
              }, 200);


     }

	  return <div className='logo'>
	           <img src={`/image/${image}`} alt='logo' />
	           <h2 className='title-one'>
	               {title_1} 
	           </h2>
	           <h4 className='title-two'>__<span>{title_2}</span>__</h4>

	           <div className='btn logo_btn' onClick={()=>scrollPage()}>
	                <span><i className="fas fa-arrow-down"></i></span>
	                <span>Click</span>
	           </div>

	         </div>
}
export default Logo