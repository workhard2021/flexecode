import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Create from '../commentaire/create';
import '../containersite/css/viewVideo.css';
import * as API from '../api/config/api';
const View  =(props)=>{

    const {id}=useParams();
    const [view,setView]=useState({});
    const {user}=props;
 
    const init =useCallback(  async()=>{
         const res= await  API.view(`/article/view/${id}`);

         if(res){ 
            
           if(res.error && res.data !==null){
                    setView(res.data)    
           }else{
                setView({})
           }
         }

    },[id])

    const redirection=(e,x)=>{
           e.preventDefault();
           window.location=x;
    }

    useEffect(()=>{
          init()
    },[init])
      
    
      return <> <section className="viewArticle">
            
              <div className="item">
               <div className="video">
                 <ReactPlayer width="100%" url={view.linkYoutube || ''}/>
              </div>
              <article  className="comment">
                  <div className="title">
                      <strong>{view.title}</strong>
                      <span>{view.dateInsert}</span>
                  </div>
                  <p>{view.comment}</p>
                  <Link to={view.linkGithub || ''} target="_blank" onClick={(e)=>redirection(e,view.linkGithub)}> Code source</Link>
              </article>

             </div>
              <aside>
                   <h3>{view.categorie}</h3>
                 
                  <div className="items">
                      <Link to={`/article-view/{view._id || ''}`}> <ReactPlayer width="100%" url={view.linkYoutube}/></Link> 
                      <Link to={`/article-view/{view._id || ''}`}> <span> {view.title}</span></Link> 
                  </div>
                 
              </aside>

      </section>
      {/* commentaire */}
      <section>
          <Create user={user} id_article={id}/>
     </section>  

    </>   
}    
   
export default View