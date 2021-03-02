import React, { useState} from 'react';
import ReactPlayer from 'react-player/youtube'
import './css/viewVideo.css';

const  ViewVideo=(props)=>{
      
      return <setion className="viewVideo">
              <div className="item">
               <div className="video">
                 <ReactPlayer width="100%" url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
              </div>
              <article  className="comment">
                  <div className="title">
                      <strong>Explication java</strong>
                      <span>Publié il y'a 3 minutes</span>
                  </div>
                  <p>Comment jes uod le commanet taire</p>
                  <a className="code source" href="/gith"> Code source</a>
              </article>

             </div>
              <aside>
                   <h3>React js</h3>

                  <div className="items">
                      <a href=""> <ReactPlayer width="100%" url="https://www.youtube.com/watch?v=ysz5S6PUM-U/"/></a> 
                      <a href=""> <span>title title 1 en reactjs en java en classe est super interessant je suis content d'etre ici </span></a> 
                  </div>
                 
              </aside>
              
      </setion>   
}
export default ViewVideo