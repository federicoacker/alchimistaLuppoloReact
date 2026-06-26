import Section from "../components/Section.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import articles from "../data/Articles/articles.js"

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