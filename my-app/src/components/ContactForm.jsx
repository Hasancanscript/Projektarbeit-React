import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [isFormVisible, setIsFormVisible] = useState(true); // Formular standardmäßig sichtbar
  const [timeLeft, setTimeLeft] = useState(600); // 10 Minuten in Sekunden

  useEffect(() => {
    if (!isFormVisible) return;

    if (timeLeft <= 0) {
      // Formular zurücksetzen, wenn die Zeit abgelaufen ist
      setIsFormVisible(false);
      setTimeLeft(600); // Timer auf 10 Minuten zurücksetzen
      alert("Die Zeit ist abgelaufen. Bitte geben Sie das Formular erneut ein.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFormVisible]);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) setTimeLeft(600); // Timer neu starten, wenn das Formular geöffnet wird
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <section className="contact-container">
      <p className="mb-6">Wenn Sie ein Anliegen oder eine Frage haben, sind wir gerne für Sie da.</p>
      <button onClick={toggleForm} className="toggle-button mb-6">
        {isFormVisible ? "Formular schliessen" : "Kontaktformular anzeigen"}
      </button>

      {isFormVisible && (
        <form className="contact-form space-y-6">
          <div className="input-group timer-group mb-6">
            <label className="timer-label">Zeit verbleibend:</label>
            <span className="timer timer-space">{formatTime(timeLeft)}</span> {/* Abstandsklasse hinzugefügt */}
          </div>

          <div className="input-group">
            <label className="form-label">Frage / Kommentar</label>
            <textarea className="form-input" placeholder="Ihre Nachricht" rows="4" maxLength="2000"></textarea>
            <small className="char-limit">Anzahl verfügbarer Zeichen: 2000</small>
          </div>

          <div className="input-group checkbox-group mb-6">
            <input type="checkbox" id="contact_me" className="form-checkbox" />
            <label htmlFor="contact_me" className="checkbox-label">
              Ich möchte, dass Sie mich kontaktieren
            </label>
            <small className="checkbox-description">
              Falls Sie kontaktiert werden möchten, geben Sie bitte eine E-Mail oder Telefonnummer an.
            </small>
          </div>

          <fieldset className="fieldset">
            <legend className="legend">Anrede</legend>
            <div className="radio-group">
              <label>
                <input type="radio" id="female" name="salutation" value="Frau" className="form-radio" />
                Frau
              </label>
              <label>
                <input type="radio" id="male" name="salutation" value="Herr" className="form-radio" />
                Herr
              </label>
              <label>
                <input type="radio" id="none" name="salutation" value="Keine" className="form-radio" />
                Keine
              </label>
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="form-label">Vorname</label>
              <input type="text" name="first_name" className="form-input" />
            </div>
            <div className="input-group">
              <label className="form-label">Nachname</label>
              <input type="text" name="last_name" className="form-input" />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">Firma/Organisation</label>
            <input type="text" name="company" className="form-input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="form-label">Strasse und Hausnr.</label>
              <input type="text" name="street" className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group">
                <label className="form-label">PLZ</label>
                <input type="text" name="zip_code" className="form-input" />
              </div>
              <div className="input-group">
                <label className="form-label">Ort</label>
                <input type="text" name="city" className="form-input" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="form-label">E-Mail-Adresse</label>
              <input type="email" name="email" className="form-input" />
            </div>
            <div className="input-group">
              <label className="form-label">Telefon</label>
              <input type="tel" name="phone" className="form-input" />
            </div>
          </div>

          <div className="input-group checkbox-group mb-6">
            <input type="checkbox" id="data_consent" className="form-checkbox" />
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
