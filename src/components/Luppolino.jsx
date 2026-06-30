import styles from './Luppolino.module.css';
import LuppolinoChat from './LuppolinoChat';


function Luppolino({isOpen, setIsOpen}) {
    

    return (
        <div className={styles.container}>

            {isOpen && (
                <LuppolinoChat
                    close={() => setIsOpen(false)}
                />
            )}

            <button
                className={styles.fab}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Apri la chat con Luppolino"
            >
                <img
                    src="/imgs/luppolino.png"
                    alt="Luppolino"
                />
            </button>

        </div>
    );
}

export default Luppolino;