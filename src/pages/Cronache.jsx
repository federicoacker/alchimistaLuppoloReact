import Section from "../components/Section.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import articles from "../data/Articles/articles.js"
import styles from "./Cronache.module.css"

function Cronache() {

    function shuffle(array) {
        const newArray = [...array];

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    };

    const randomArticles = shuffle(articles).slice(0, 3);

    return (
        <Section>
            <div className="m-4">
                <h2 className={styles.title}>Le Cronache</h2>
                <p className={styles.text}>
                    Ogni birra racconta una storia fatta di tradizioni, ingredienti, tecniche e curiosità. In questa sezione raccogliamo articoli dedicati al mondo brassicolo:
                    dalle origini della birra agli stili più celebri, dalle tecniche di produzione ai consigli per degustarla e abbinarla al meglio.
                    Che tu sia un semplice curioso o un appassionato, qui troverai spunti per approfondire la cultura della birra artigianale e scoprire cosa si nasconde dietro ogni sorso.
                </p>
            </div>
            <div>
                {randomArticles.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>

        </Section>
    )
}
export default Cronache