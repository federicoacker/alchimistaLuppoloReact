
function Section({ children, className = "", theme = "dark" }) {

    return (

        <section className={`section section-${theme} ${className}`}>
            <div className="container">
                {children}
            </div>
        </section>

    )
}

export default Section;