import React from 'react';
import './MainContent.css';
import maizeField from '../assets/maize_field_1775060203983.png';

function MainContent() {
  return (
    <div className="main-content-container">
      <div className="image-card">
        <img src={maizeField} alt="Healthy Maize Growth" className="main-image" />
        <div className="card-content">
          <h2>Healthy Maize Growth</h2>
          <p>
            Healthy Maize Growth exrewing soid halzeration, immunity farming, Useroccursisunth Neaeting irlilgatin, st man'levrsy theirlly of a emeption, conving inaction, coolving dia maize puslial Methods.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
