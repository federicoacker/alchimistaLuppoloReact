
import HeroSection from "../components/HeroSection";
import useProducts from "../hooks/useProducts.js";


function Home() {
    const {products, loading, error} = useProducts("?limit=6&brewery=L'Alchimista del Luppolo")
    console.log(products);
    console.log(error);
    return (
        <>
            <HeroSection />
        </>
    )

}
export default Home;