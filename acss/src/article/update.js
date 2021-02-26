import React,{useState,useRef,useEffect,useCallback} from 'react';
import {useParams,Link} from 'react-router-dom';
import * as API from '../api/config/api';
const Update=()=>{
    const option=['php','css','java','javascript','python','nodejs','reactjs','react native'];
    const [data,setData]=useState({});
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const {id}=useParams();
    const URL=`/article/view/${id}`;
    const URLUPDATE=`/article/update/${id}`;

    const saisir=(e)=>{
          e.preventDefault();
          const name=e.target.name;
          const value=e.target.value;
          switch(name){
                case 'categorie':
                    setData(state=>{return {...state,[name]:value}})
                    break;

               case 'title':
                    setData(state=>{return {...state,[name]:value}})
                    break;
                case 'comment':
                   setData(state=>{return {...state,[name]:value}})
                   break;
                
                case 'linkYoutube':
                    setData(state=>{return {...state,[name]:value}})
                    break;

              case 'linkGithub':
                        setData(state=>{return {...state,[name]:value}})
                        break;

               case 'image':
                    setData(state=>{return {...state,[name]:e.target.files}})
                    break;

               default :
                   const val=name.split(' ').join('_');
                  setData(state=>{return {...state,codeSource:{...state.codeSource,[val]:value} }})
                  return null
          }
    }
    
    const send=async (e)=>{

         e.preventDefault();
         setMessage('')
         const form_data=new FormData();
        if(data.image){
                for(let i=0;i<data.image.length;i++){
                    form_data.append('imageUrl',data.image[i]);
                }
        }
        form_data.append('data',JSON.stringify(data));
         const res= await API.update(form_data,URLUPDATE);
         if(res){
              if(res.error){
                   setMessage(res.data)
                   if(inputRefFile.current){
                        inputRefFile.current.value=null;
                   }
                   setSuccess(true)

              }else{
                  setMessage(res.data)
              }

         }else{
              setMessage('Veuillez actualiser la page')
         }
    }

    const init= useCallback (  async()=>{
            const res= await API.view(URL);
            if(res){
                   if(res.error){
                    setData(state=>{ return {...state,...res.data} });
                }else{
                         setMessage(res.data)
                    }
              }else{
                   setMessage('Veuillez actualiser la page')
              }
    },[URL])

    useEffect(()=>{
         init()
    },[init])

    return <form onSubmit={(e)=>send(e)}>
             <h2>ARTICLE UPDATE</h2>
              {message &&  <div className={success? 'valide':'invalid'}> {message}</div>}
              <Link to='/'>HOME</Link>

              <table>
                <tbody>
  
                  <tr>
                  <th>
                       <label htmlFor='categorie'>Categorie</label>
                  </th>
                      <td> 
                           <select name="categorie" id="categorie" value={data.categorie || ''} onChange={(e)=>saisir(e)}>
                           <option  value='' desabled='true'>Choisir</option>
                            {option.map((value,index)=>{ return <option key={index} value={value}>{value}</option> }) }
                           </select>
                      </td>

                  </tr>
                  <tr>
                      <th>
                          <label htmlFor='title'>Titre:</label>
                      </th>
                      <td><input type="text" value={data.title || ""}  id="title" name="title" placeholder="Titre"  onChange={(e)=>saisir(e)}/></td>
                  </tr>
                  <tr>
                      <th>
                          <label htmlFor='linkGithub'>Lien github:</label>
                      </th>
                      <td><input type="text" value={data.linkGithub || ""} id="linkGithub" name="linkGithub" placeholder="Lien github"  onChange={(e)=>saisir(e)}/></td>
                  </tr>
                  <tr>
                      <th>
                       <label htmlFor='imageUrl'>Image:</label>
                     </th>
                      <td><input type="file" name="image"  ref={inputRefFile}  onChange={(e)=>saisir(e)} /></td>
                  </tr>
                   <tr>
                      <th>
                         <label htmlFor="comment">commentaire:</label>
                      </th>
                      <td><textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}></textarea></td>
                   </tr>

                   <tr>
                      <td colSpan="2"><button>Envoyer</button></td>
                   </tr>
                 </tbody>
              </table>

    </form>
}

export default Update;