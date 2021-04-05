import React,{useState,useEffect,useCallback} from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/liste-article.css';
import Search from '../containersite/search';
import * as API from '../api/config/api';

const MenagerCategorieView=(props)=>{
   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const URL=`/project/all/`;
   const {user,setGestionP}=props;
   

   const init= useCallback( async ()=>{
           const res = await API.view(URL);
            if(res.error){

               if(user.role !=='admin') { 
                  const array_cm=res.data.filter(value=>value.idUser===user._id);
                  setArray(array_cm);
                  setSuccess(true);

               }else {
                  setArray(res.data);
                  setSuccess(true);
               }
            }
   },[URL,user.role,user._id]);

   const destroy= async (id)=> {
           
           const URL=`/project/destroy/${id}`;
           setMessage('');
           setSuccess(false)
           const res= await API.destroy(URL);
           if(res){
              if(res.error){
                     setMessage(res.data)
                     setSuccess(true)  
              }else{
                     setMessage(res.data)
                    
              }
           }    
   }
   const redirection=(e,a)=>{
            e.preventDefault();
            window.location=a;
   }

   useEffect(()=>{
          init()
   },[success,init])
    
      return <section className="list">
                 <Search setSearch={setArray} success={success} setSuccess={setSuccess} setMessage={setMessage} visibilite={false} url='/project/search'/>
                 {message && <div className="invalid"> {message}</div> }
                <table>
                    <caption>Gestiion de votre projet</caption>  
                    <thead>
                        <tr>
                           <th>Voir</th>
                           <th>Modifier</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {array && array.map((value,index)=> {
                        return user._id===value.idUser && <tr key={value._id}>
                           
                            <td><Link to={`${value.linkGithub}`} target='_blank' onClick={(e)=>redirection(e,value.linkGithub)} ><img  src={value.imageUrl}alt="tag" /></Link></td>
                            <td><span className='udpate'   onClick={()=>setGestionP(x=>{return {...x,list:true,create:false,idUpdate:value._id}})}><i className="fas fa-edit">Modifier</i></span></td>
                            <td><Link to="#" onClick={(e)=>destroy(value._id)}> <i className="fas fa-trash-alt">suprimer</i></Link></td>
                        </tr>
                     })}

                    </tbody>
                </table>
         
         
        </section>   
}
export default MenagerCategorieView