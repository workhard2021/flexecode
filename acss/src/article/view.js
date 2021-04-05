import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Create from '../commentaire/create';
import '../containersite/css/viewVideo.css';
import * as API from '../api/config/api';
const View  =(props)=>{

    const {id}=useParams();
    const [all,setAll]=useState([]);
    const [view,setView]=useState({});
    const {user}=props;
 
    const init =useCallback(  async()=>{
         const res= await  API.view(`/article/view/${id}`);
         const res_all=await API.all('/article/all');
         if(res){ 
            
           if(res.error && res.data !==null){
                    setView(res.data)    
           }else{
                setView({})
           }
         }

         if(res_all.error){
              let all_a=res_all.data.filter(value=>value.categorie===res.data.categorie);
              all_a=all_a.filter(value=>value._id!==id);
              setAll(all_a);
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
                  <div className="title_">
                      <strong>{view.title}</strong>
                      <span>{view.dateInsert}</span>
                  </div>
                  <p>{view.comment}</p>
                  <Link to={view.linkGithub || ''} target="_blank" onClick={(e)=>redirection(e,view.linkGithub)}> Code source</Link>
              </article>

             </div>
              <aside>
                   <h3>{view.categorie}</h3>
                 
                   {all && all.map(value=>{
                    return  <div className="items" key={value._id}>
                     <Link to={`/article-view/${value._id}`}> <ReactPlayer  height="40px"  width="100%" url={value.linkYoutube}/></Link> 
                     <Link to={`/article-view/${value._id}`}> <span> {value.title}</span></Link> 
                    </div>
                   })}

              </aside>

      </section>
      {/* commentaire */}
      <section>
          <Create user={user} id_article={id}/>
     </section>  

    </>   
}    
   
export default View