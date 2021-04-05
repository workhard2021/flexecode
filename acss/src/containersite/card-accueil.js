import React from 'react';
import { Link } from 'react-router-dom';
import '../containersite/css/card-accueil.css'
const CardAccueil=(props)=>{
     const {array,type}=props;
    if(!array.length>0){
              return null;
    }

    return <section className="cardAccueil">
     
      <div className="dot" id={type?'color_categorie':''}>
        <div className="categorie">
          {  type? 'Categorie' : 'Recent'} 
        </div>

         {!type ? 
             array.map((value,index)=>{
               return  <React.Fragment key={index}>

               <div className="item">
                   <div className='logo'><Link to={`article-view/${value._id}`}><img src={value.imageUrl || "/image/r1.jpg"} alt="..."/></Link></div> 
                   <h4><Link to={`article-view/${value._id}`}>{value.title}</Link></h4>
                  </div>
                <hr/>
                </React.Fragment>
             })
         
         :
             array.map((value,index)=>{
               return  <React.Fragment key={index}>

               <div className="item ">
                   <div className='logo'><Link to={`article/categorie/${value.categorie}`}><img src={value.imageUrl || "/image/r1.jpg"} alt="..."/></Link></div> 
                   <h4><Link to={`article/categorie/${value.categorie}`}>{value.categorie}</Link></h4>
                  </div>
                <hr/>
                </React.Fragment>
             })
         }

      </div>

    </section>
}  
export default CardAccueil; 