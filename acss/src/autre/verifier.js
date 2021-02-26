const Verifier=(object,array)=>{
	      
	       let newObject={};
	       let errorObject={};
	       let newArray=array;
	       let arrayKey=Object.keys(object);

        for(let i=0;i<newArray.length;i++){ 

	            let test=arrayKey.find(value=> newArray[i]===value);

	            if(test !==undefined && object[newArray[i]].length>2){
                                    let str='';
                                     str = object[newArray[i]].replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
                                     str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
                                     str = str.replace(/[\s]$/,""); //Enlève les espaces a la fin

	          	   	    	 	     newObject[newArray[i]]=str;
	          	   	    	 	     errorObject[newArray[i]]='Validé';

	          	}else{
	          	   	     errorObject[newArray[i]]='le champ doit contenir au moins 3 caractères';
	            }
	          	     
	    }

	    if(!Object.values(errorObject).every(value=> value==='Validé')){ 
	    	  
	    	  return errorObject;

	    }else{
             
             newObject['verifier']=true;
	    	 return newObject;
	    }

}
export default Verifier