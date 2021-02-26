export const scrollPage=(y=null)=>{
                
                setTimeout(function() {
                       window.scroll(0,100)
                 },150);
}
export function ValidationMail(email)
{
	var regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i;

	if(regex.test(email))
	{
		return true
	}
	else
	{
		return false
	}
}

export function VerifyImage(file,maxSize=10000000)
{     const name=file.name;
	  const size=file.size;
      
    if(name.match(/\.(jpeg|jpg|gif|png)$/)!= null){
          if(size>maxSize){
               return `La taille de l'iamge ne doit pas dépasser ${maxSize}`;
           }else{

           	    return '';
           }
            
    }else{
    	   return "l'image doit etre du type jpg, jpeg, gif, png";
    }
}
