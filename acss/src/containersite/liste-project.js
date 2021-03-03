import React, { useState} from 'react';
import './css/liste-article.css';
const ListeProject=(props)=>{
       const placeholder="Rechercher..."
    
      return <setion className="list">
                
                <table>
                    
                    <caption>Liste des project</caption>
                    <form>
                        <input type="text" name="search" placeholder={placeholder}/>
                        <button><i class="fas fa-search"></i></button>
                    </form>
                    <thead>
                        <tr>
                           <th>N°</th>
                           <th>Voir</th>
                           <th>Modifier</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#">1</a></td>
                            <td><a href="#"><img  src="/image/r1.jpg" alt="tag" /></a></td>
                            <td><a href="#"><i class="fas fa-edit">Modifier</i></a></td>
                            <td><a href="#"> <i class="fas fa-trash-alt">suprimer</i></a></td>
                        </tr>
                    </tbody>
                </table>
         
         
        </setion>   
}
export default ListeProject