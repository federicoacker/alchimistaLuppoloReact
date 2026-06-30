
import AboutUsSection from "../components/AboutUsSection";
import HeroSection from "../components/HeroSection";
import NewBeers from "../components/NewBeers";
import OurBeers from "../components/OurBeers";
import Section from "../components/Section";
import { Container } from "react-bootstrap";



function Home() {

    return (
        <>
            <HeroSection/>
            <Section>
                <Container fluid="md">
                    <OurBeers />
                </Container>
            </Section>
            <AboutUsSection/>
            <Section>
                <Container fluid="md">
                    <NewBeers />
                </Container>
            </Section>
        </>
    )

}
export default Home;