import styles from "./PageHeader.module.css";

export default function PageHeader({ eyebrow, title, lead, paper = false }) {
  return (
    <section className={`section ${paper ? "section--paper" : ""} ${styles.header}`}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
