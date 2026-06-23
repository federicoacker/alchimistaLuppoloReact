import { useWishlist } from "../contexts/WishlistContext.jsx";
import styles from "./Wishlist.module.css";
import Section from "../components/Section.jsx";
import WishlistItem from "../components/WishlistItem.jsx";
import useWishlistProducts from "../hooks/useWishlistProducts.js"

function WishlistPage() {

    const { wishlist } = useWishlist();

    const {
        products,
        loading,
        error
    } = useWishlistProducts(wishlist);


    if (loading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>

            <h1 className={styles.title}>Wishlist</h1>

            <div className={styles.alchemyDivider}>
                <span className={styles.symbols}>
                    🜁 🜂 🜄 🜃
                </span>
            </div>
            <Section className={styles.wishlistTable}>

                <header className={styles.tableHeader}>
                    <span>Prodotto</span>

                    <span>Prezzo</span>

                    <span>Azioni</span>

                </header>

                {
                    products.length === 0 ? (
                        <p className={styles.empty}>La tua wishlist è vuota.</p>
                    ) : (
                        products.map(product => (
                            <WishlistItem
                                key={product.slug}
                                product={product}
                            />
                        ))
                    )
                }

            </Section>
        </main>
    );
}

export default WishlistPage;