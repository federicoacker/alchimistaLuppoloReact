import styles from './LuppolinoAgent.module.css';



function LuppolinoAgent() {

 const [isOpen, setIsOpen] = useState(false);

 return (
<>
{isOpen && (
    <div className={styles.chatOverlay} onClick={()=> setIsOpen(false)}>
        <div className={styles.luppolinoChatBox} onClick={(e)=> e.stopPropagation}>
            <h2>Chiedi consiglio a Luppolino!🍻</h2>
             <p><em>L'alchimista che ti aiuta a scoprire le birre migliori!</em></p>
        </div>

    </div>
    
)
}







</>
 )



}