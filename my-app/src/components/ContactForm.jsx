import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <section className="contact-container">
      <h1 className="contact-title">Kontaktformular</h1>
      <p>Wenn Sie ein Anliegen oder eine Frage haben, sind wir gerne für Sie da.</p>
      <button onClick={toggleForm} className="toggle-button">
        {isFormVisible ? "Formular schliessen" : "Kontaktformular anzeigen"}
      </button>

      {isFormVisible && (
        <form className="contact-form">
          <div className="input-group timer-group">
            <label className="timer-label">Timer:</label>
            <span className="timer">{time}</span>
          </div>

          <div className="input-group">
            <label>Frage / Kommentar</label>
            <textarea placeholder="Ihre Nachricht" rows="4" maxLength="2000"></textarea>
            <small className="char-limit">Anzahl verfügbarer Zeichen: 2000</small>
          </div>

          <div className="input-group checkbox-group">
            <input type="checkbox" id="contact_me" />
            <label htmlFor="contact_me" className="checkbox-label">
              Ich möchte, dass Sie mich kontaktieren
            </label>
            <small className="checkbox-description">
              Falls Sie kontaktiert werden möchten, müssen Sie eine E-Mail oder Telefonnummer angeben.
            </small>
          </div>

          <div className="input-group">
            <label>Anrede</label>
            <div className="radio-group">
              <input type="radio" id="female" name="salutation" value="Frau" />
              <label htmlFor="female">Frau</label>
              <input type="radio" id="male" name="salutation" value="Herr" />
              <label htmlFor="male">Herr</label>
              <input type="radio" id="none" name="salutation" value="Keine" />
              <label htmlFor="none">Keine</label>
            </div>
          </div>

          <div className="input-group">
            <label>Vorname</label>
            <input type="text" name="first_name" />
          </div>
          <div className="input-group">
            <label>Nachname</label>
            <input type="text" name="last_name" />
          </div>

          <div className="input-group">
            <label>Firma/Organisation</label>
            <input type="text" name="company" />
          </div>

          <div className="input-group">
            <label>Strasse und Hausnr.</label>
            <input type="text" name="street" />
          </div>

          <div className="input-group">
            <label>PLZ</label>
            <input type="text" name="zip_code" />
          </div>
          <div className="input-group">
            <label>Ort</label>
            <input type="text" name="city" />
          </div>

          <div className="input-group">
            <label>E-Mail-Adresse</label>
            <input type="email" name="email" />
          </div>
          <div className="input-group">
            <label>Telefon</label>
            <input type="tel" name="phone" />
          </div>

          <div className="input-group checkbox-group">
            <input type="checkbox" id="data_consent" />
            <label htmlFor="data_consent" className="checkbox-label">
              Ich stimme der Datenbearbeitung zu.
            </label>
            <small className="checkbox-description">
              Hinweis: Die Daten werden gemäss den Bestimmungen der Datenschutz- und Personalgesetzgebung bearbeitet.
            </small>
          </div>

          <button type="submit" className="submit-button">Absenden</button>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
