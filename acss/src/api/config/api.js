import  axios from 'axios';
import * as PARAMS_CONFIG from '../constante/request-config';

export const all= async(url)=>{
	        let error=false;
        try{
        	    const res= await fetch(PARAMS_CONFIG.URI+url,{
							  method:'get',
							  headers:PARAMS_CONFIG.HEADERS
				         })

                const data=await res.json();

    	        if(res.status===404){

        	   	    throw new Error(data)

        	    }else if(res.status===201){

        	   	    	return  {error:error,data:data}; 

        	    }else {
        	   	    	return  {error:!error,data:data}; 
        	    }

         }
        catch(e) {

         	   return e
        }			
}

export const view= async(url)=>{
	        let error=false;

	        try{
	        	    const res= await fetch(PARAMS_CONFIG.URI+url,{
			        	 	method:'get',
			        	 	headers:PARAMS_CONFIG.HEADERS
			        	 })
	        	   
	        	    const  data= await res.json()

        	        if(res.status===404){

	        	   	    throw new Error(data)
 
	        	    }else if(res.status===201){

	        	  	    	return  {error:error,data:data}; 
	        	    }else {
	        	   	    	return  {error:!error,data:data}; 
	        	    }
	        }

	        catch(e){

				return e
	        }
}

export const create= async (data_,url)=>{
	        
	        let error=false;

		    try{
		        	const res= await axios({
					            url:PARAMS_CONFIG.URI+url,
				        	 	method:'post',
				        	 	headers:PARAMS_CONFIG.HEADERS,
				        	 	data:data_
				        	 });

		            const data=await res.data;
					console.log(data)

	        	   if(res.status===404){

	        	   	    throw new Error(data)

	        	   }else if(res.status===201){

	        	   	    	return  {error:error,data:data}; 
	        	   }else {
	        	   	    	return  {error:!error,data:data}; 
	        	   }
	        }

	        catch(e){
                 
				return e.message
	        }
}

export const destroy= async(url)=>{
	  
             let error=false;
		    try{
		        	const res = await fetch(PARAMS_CONFIG.URI+url,{
			          	       method:'delete',
			          	       headers:PARAMS_CONFIG.HEADERS
	                        });

                   const data = await res.json()

	        	   if(res.status===404){

	        	   	     throw new Error(data)

	        	   }else if(res.status===201){

	        	   	        return {error:error,data:data};
	        	   }else {
	        	   	    	return  {error:!error,data:data}; 
	        	   }
	        }

	        catch(e){

	        	  return e
	        }
}

export const update=async(data_,url)=>{
	            
	         const error=false;

             PARAMS_CONFIG.HEADERS.autorization=data_.token;

		     try{
		        	const res= await axios({
		          	             url:PARAMS_CONFIG.URI+url,
				          	     method:'PUT',
				          	     headers:PARAMS_CONFIG.HEADERS,
				          	     data:data_
				            });
		           const data= await res.data;

	        	    if(res.status===404){
	        	   	       throw new Error(data)

	        	    }else if(res.status===201){

	        	   	         return  {error:error,data:data};
	        	    }else {

	        	   	         return  {error:!error,data:data};
	        	    }
	        }
	        catch(e){

	        	  return e
	        }
}

export const login=async(data_,url)=>{
	         let error=false;
		     try{
		        	const res= await axios({
		          	             url:PARAMS_CONFIG.URI+url,
				          	     method:'post',
				          	     headers:PARAMS_CONFIG.HEADERS,
				          	     data:data_
				            });

                    const data = await res.data;

	        	    if(res.status===404){
	        	   	       throw new Error(data)

	        	    }else if(res.status===201){
	        	    	    
	        	   	    	return  {error:error,data:data}; 
	        	    }else {
	        	    	     
	        	   	    	 return  {error:!error,data:data}; 
	        	    }
	        }

	        catch(e){

	        	  return e
	        }
}


export const URIAPI=PARAMS_CONFIG.URI;




