
function Section({ children, className = "", theme = "dark" }) {

    return (

        <section className={`section section-${theme} section-frame ${className}`}>

            {children}

        </section>

    )
}

export default Section;