import { useState } from "react";
import styles from "./ArticleCard.module.css";


function ArticleCard({ article }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={styles.card}>

      <div className={styles.header}>

        <div className={styles.imageContainer}>
          <img
            src={article.image}
            alt={article.title}
            className={styles.image}
          />
        </div>

        <div className={styles.headerInfo}>
          <h3 className={styles.title}>
            {article.title}
          </h3>

          <p className={styles.info}>
            {article.author} • {article.date}
          </p>
        </div>

      </div>

      <div className={styles.body}>

        <div className={`${styles.content} ${open ? styles.open : ""}`}>
          {article.content}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={styles.button}
        >
          {open ? "Mostra meno ▲" : "Leggi tutto ▼"}
        </button>

      </div>

    </article>
  );
}

export default ArticleCard;
