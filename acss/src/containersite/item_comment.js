import React, { useState,useEffect,useCallback} from 'react';
import './css/comment.css';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';
import Update from '../commentaire/repondreCommentaire';
const ItemComment=(props)=>{
       const {idArticle,user,setSuccess,setOpenComment,success}=props;
       const [item,setItem]=useState([]);
       const [idCommentaire,setIdCommentaire]=useState('');
       const init =useCallback(  async()=>{
       const res= await  API.view(`/commentaire/view/${idArticle}`);
       

         if(res){ 
            
           if(res.error && res.data !==null){
                    setItem(res.data) 
           }else{
                    setItem([])
           }
         }
    },[idArticle])

    const destroy=async(x)=>{
        
         const res=await API.destroy(`/commentaire/destroy/${x}`);
         if(res){
            setSuccess(!success)
         }
         
    }

    const like=async(x)=>{
      const data=JSON.stringify({id:x,idUser:user._id|| "1"});
      const res=await API.view(`/commentaire/like/${data}`);
      if(res){
        setSuccess(!success)
      }
  
     }

    const comment=async(x)=>{
           
          if(x===idCommentaire){
                setIdCommentaire('');
                setOpenComment(false);
                 
          }else {
                setIdCommentaire(x);
                setOpenComment(true);     
          }
    }
    
    useEffect(()=>{
          init()
    },[init,success,idCommentaire]);

      return <section className="comment">
            {item && item.map((value,index)=>{

               return  <div id="item" key={index}>
                     
                      <div id="author">
                         <img id="logo" src={value.imageUser? value.imageUser:'/image/r2.jpg'}  alt="logo"/> 
                         <span>{value.fullName? value.fullName :'Anonyme'}</span>
                          <span>{value.dateInsert}</span>
                      </div>

                      <p> {value.comment}</p> 
                      <div className="btn">
                           <span onClick={()=>{like(value._id)}} className={
                              value.like &&  value.like.map((val)=>{
                                        
                                      return  val.idUser===value._id ? "like":"dislike"
                                })
                            }><i className="far fa-thumbs-up">{value.like.length || 0}</i></span>
                            {(user.role==="admin" || user._id===value.idUser) && <span onClick={()=>destroy(value._id)}><i className="far fa-trash-alt"></i></span> }
                           <span onClick={()=>comment(value._id)}><Link to="#form"> <i className="far fa-comment-dots"></i> </Link></span>
                      </div>

                      {   
                          value._id===idCommentaire &&
                          <Update user={user} idCommentaire={idCommentaire} setOpenComment={setOpenComment}  comment={comment} idArticle={idArticle}/>
                  
                      }

                      {
                        value.commentItem && value.commentItem.map((value,index)=>{    
                       
                        return   <div id="item-dot" key={index}>
       
                         <div id="author">
                          <img id="logo_image" src={value.imageUser?value.imageUser:'/image/r2.jpg'}  alt="logo"/> 
                          <span>{value.fullName || 'Anonyme'}</span>
                          <span>{value.dateInsert}</span>
                        </div>
                        <p> {value.comment} </p> 
                       </div>
                       })
                      }
                      
                   </div>
            })}
            
        </section>   
}
export default ItemComment