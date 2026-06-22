
import HeroSection from "../components/HeroSection";
import useProducts from "../hooks/useProducts.js";
import Beers from "../components/Beers";



function Home() {
    const {products, loading, error} = useProducts("?limit=6&brewery=L'Alchimista del Luppolo")
    console.log(products);
    console.log(error);
    return (
        <>
            <HeroSection />
            <Beers />
        </>
    )

}
export default Home;