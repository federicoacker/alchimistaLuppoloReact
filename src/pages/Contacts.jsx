import ComeFindUs from "../components/ComeFindUs"
import Newsletter from "../components/Newsletter"
import Section from "../components/Section"

function Contacts() {
    return (
        <>
            <Section>
                <Newsletter />
            </Section>
            <Section>
                <ComeFindUs/>
            </Section>
        </>
    )
}

export default Contacts