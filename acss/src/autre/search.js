
import React,{useState,useRef} from 'react';
import {Link,useHistory } from 'react-router-dom';
import * as API from '../api/config/api';
import '../css/search.css';
import {scrollPage} from '../autre/scrollPage';

const Search=(props)=>{
	    let url=`/app/search/`;

	      const init='Recherche';
        const [text,setText]=useState({title:'',nextTitle:''})
        const [array,setSearch]=useState({data:[],loading:false});
        const [noFind,setNofind]=useState('');
        const inputFocus=useRef(null);
        const history=useHistory();
        let resultat='';

        const Saisir=(e)=>{
        	   
        	   e.preventDefault()
        	   const name=e.target.name;
        	   const value=e.target.value;
        	   setText({...text,[name]:value})
        	   let list=document.getElementById('list-search');
        	   list.style.display='block';
        	   if(value!==''){
                   url+=value;
        	   	   API.getView(setSearch,{url:url,token:null})
        	   }
        	   if(array.data.length===0){
        	   	    setNofind('Aucun resultat trouvé');
        	   }else{
                      setNofind('');
        	   }
           
        }
        const resetInit=(x,e)=>{
        	   e.preventDefault();
        	   const text=document.getElementById(`text-${x}`);
        	   let inputSearch=document.getElementById('text-search');
        	   let list=document.getElementById('list-search');
        	   inputSearch.value=text.textContent;
        	   list.style.display='none';
             scrollPage()
        }
       


        const search=(e)=>{
              const inputSearch=document.getElementById('text-search'); 
              const list_search =document.getElementsByClassName('text_');
              let btn_search=document.getElementById('btn_search');
              const x=document.body.clientWidth;
              
                if(x<600 || x===600 )
                { 

                           
                          if(inputSearch.style.width==='60%')
                          {  if(inputSearch.value==='')
                             { inputSearch.style.width='0%';
                               inputSearch.style.opacity='0';
                               btn_search.className='btn_search';
                               inputFocus.current.focus()
                             }

                          }else
                          {   
                                inputSearch.style.width='60%';
                                inputSearch.style.opacity='1';
                                btn_search.className='';
                                inputFocus.current.focus()
                          }

            }else{

               btn_search.className='';
            }

              for(let i=0;i<list_search.length;i++){
                 list_search[i].style.display='none';
               }

               
        }
        
        const Send=(e)=>{
            e.preventDefault();
            if(text.title!=='' && text.nextTitle!==text.title){
                url+=text.title
                setText({...text,nextTitle:text.title})
                history.push(url);
            }
            scrollPage();  
        }


      if(array.loading) {  

              resultat=array.data && array.data.map((value,index)=>{
            	      return <li className='text_' key={index} id={`text-${value._id}`} onClick={(e)=>resetInit(value._id,e)}>
            	                 <Link to={`/app/search/${value.title}`}>{value.title}</Link>
            	             </li>
              })
      }
        
    	    return <>
    	            <div className='search'>

                    <form onSubmit={(e)=>Send(e)} className='item' >
                        <input type='text' id='text-search' ref={inputFocus} value={text.title} name='title' onChange={(e)=>Saisir(e)} placeholder={init} />
                        <button id='btn_search' onClick={(e)=>search(e)}><i className="fas fa-search"></i></button>
                    </form>
                    <ul id='list-search'>
                           {  noFind===''?
                              resultat
                             :
                             <li className=' text_ verifier'> {noFind}</li>
                             
                           }
                      </ul>

    	            </div>
    	          </>
     

}

export default Search