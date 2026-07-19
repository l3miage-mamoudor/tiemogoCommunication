"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

const BOOKING_URL = "https://calendly.com/mamoudouroumanatou51/30min";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqevnqwa";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section section--paper">
      <div className="container">
        <div className={styles.wrap}>
          <div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--outline-light ${styles.bookingBtn}`}
            >
              Réserver un rendez-vous
            </a>

            <div className={styles.infos}>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <p>iitiemogo@gmail.com</p>
              </div>
              <div>
                <p className={styles.infoLabel}>Téléphone</p>
                <p>01 23 45 67 89</p>
              </div>
              <div>
                <p className={styles.infoLabel}>Adresse</p>
                <p>12 rue à préciser, Ville</p>
              </div>
            </div>
          </div>

          {status === "success" ? (
            <div className={styles.successBox}>
              <p className={styles.successTitle}>Message envoyé ✓</p>
              <p>
                Merci, votre demande a bien été reçue. Nous revenons vers vous
                sous 48h.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Prénom</span>
                  <input name="firstname" type="text" required />
                </label>
                <label className={styles.field}>
                  <span>Nom</span>
                  <input name="lastname" type="text" required />
                </label>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Entreprise</span>
                  <input name="company" type="text" />
                </label>
                <label className={styles.field}>
                  <span>Téléphone</span>
                  <input name="phone" type="tel" />
                </label>
              </div>

              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" required />
              </label>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Budget estimé</span>
                  <input name="budget" type="text" placeholder="Ex. 2000 – 5000 €" />
                </label>
                <label className={styles.field}>
                  <span>Date de réalisation souhaitée</span>
                  <input name="date" type="date" />
                </label>
              </div>

              <label className={styles.field}>
                <span>Description du projet</span>
                <textarea name="message" rows={5} required />
              </label>

              <button
                type="submit"
                className="btn btn--solid"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>

              {status === "error" && (
                <p className={styles.errorText}>
                  L'envoi a échoué. Réessaie, ou écris-nous directement à
                  iitiemogo@gmail.com.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
