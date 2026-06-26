import { useState } from "react";
import styles from "./ArticleCard.module.css";


function ArticleCard({ article }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={styles.card}>

      <img
        src={article.image}
        alt={article.title}
        className={styles.image}
      />

      <div className={styles.body}>

        <h3>{article.title}</h3>

        <p className={styles.info}>
          {article.author} • {article.date}
        </p>

        {!open && (
          <p>{article.excerpt}</p>
        )}

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
