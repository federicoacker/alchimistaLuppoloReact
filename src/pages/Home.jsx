import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
function Home() {

    return (
        <>
        <h1>Home</h1>
        <p>Benvenuti nella pagina Alchimista del luppolo</p>

        <section className="">
            <h5>registro della birra</h5>
            <h1>Birre leggendarie tra mana e malto</h1>
        <Button variant="warning">Esplora le nostre birre</Button>
        <Button variant="danger">Scopri le nuove Birre</Button>
        </section>
        </>
    )
    
}
export default Home;