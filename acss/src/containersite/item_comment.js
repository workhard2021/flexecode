import React, { useState} from 'react';
import './css/comment.css';
const ItemComment=(props)=>{
    
      return <setion className="comment">
            <div id="item">

               <div id="author">
                  <img id="logo_image" src="/image/r1.jpg"  alt="logo"/> 
                  <span>souleymane camara</span>
                  <span>il y'a 3 minute</span>
               </div>
               <p> sdsd couc un je sous le mane e t vous jjsdshd ejdhdh tres bien mon pote je suit tres couc sdosdo </p> 
               <div className="btn">
                    <span className={1==1? "like":"dislike"}><i class="far fa-thumbs-up"> 1</i></span>
                    <span><i class="far fa-trash-alt"></i></span>
                    <span><a href="form#"> <i class="far fa-comment-dots"></i> </a></span>
               </div>
               <div id="item-dot">

                 <div id="author">
                  <img id="logo_image" src="/image/r1.jpg"  alt="logo"/> 
                  <span>souleymane camara</span>
                  <span>il y'a 3 minute</span>
                </div>
               <p> sdsd couc un je sous le mane e t vous jjsdshd ejdhdh tres bien mon pote je suit tres couc sdosdo </p> 
              
               <div className="btn">
                    <span className={1==1? "like":"dislike"}><i class="far fa-thumbs-up"> 1</i></span>
                    <span><i class="far fa-trash-alt"></i></span>
                    <span><a href="form#"> <i class="far fa-comment-dots"></i> </a></span>
               </div>

               </div>
            </div>
         
        </setion>   
}
export default ItemComment