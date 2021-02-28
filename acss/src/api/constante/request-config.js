 const token=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')).token:null;
export const HEADERS={
	            'Content-Type':'application/json',
	            accept:'application/json',
				authorization:token
            };
//"https://acss9.herokuapp.com";
export const URI="http://localhost:8181";
 
