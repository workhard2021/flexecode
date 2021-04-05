import React from 'react';
import './css/footerPage.css';
const FooterPage=(props)=> {
 

    return <footer className="footer">
       <h2 className="title_page">Suivez-nous </h2>

       <div className="reseau">
        <a href="https://wa.me/224690192979" rel="noreferrer" target="_blank"><i className="fas fa-phone-volume"></i></a> 
        <a href="https://github.com/workhard2021/" rel="noreferrer" target="_blank"><i className="fab fa-github"></i></a> 
        <a href='mailto:csouleymane025@gmail.com'><i class="fas fa-envelope-square"></i></a> 
        <a href="https://www.linkedin.com/feed/" rel="noreferrer" target="_blank"><i className="fab fa-linkedin-in"></i></a> 
        <a href="https://www.youtube.com/channel/UCeqWf48MPFVcVU18fBvxtuw" rel="noreferrer" target="_blank"><i className="fab fa-youtube"></i></a> 
       </div>
       <ul className="container mt-5">
           <li><span id="Copyright" >Copyright &copy; 2021 flexecode. tous droits réservés.</span></li>
       </ul>
    </footer>
     
}

export default FooterPage;