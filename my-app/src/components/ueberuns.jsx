import React from 'react';
import './ueberuns.css';

function UeberUns() {
  return (
    <div className="ueber-uns-container">
      <h1 className="ueber-uns-header">Ich heisse Hasan Balci</h1>
      <img src="dein-bild.jpg" alt="Hasan Balci" className="ueber-uns-image" />
      <p className="ueber-uns-text">
        Willkommen auf meiner Seite! Ich bin ein leidenschaftlicher Entwickler und Gründer von [Unternehmensname]. 
        Hierbei ist es unser Ziel, durch [Dienstleistung oder Produktbeschreibung] den Alltag unserer Kunden zu verbessern.
      </p>
    </div>
  );
}

export default UeberUns;
