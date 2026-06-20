
function Section({ children, className = "", theme = "dark" }) {

    return (

        <section className={`section section-${theme} ${className}`}>
           
                {children}
           
        </section>

    )
}

export default Section;