import styles from './Luppolino.module.css';
import LuppolinoChat from './LuppolinoChat';
import { useState, useEffect } from 'react';
import useAgent from "../hooks/useAgent.js";

function Luppolino({ isOpen, setIsOpen }) {

    const [prompt, setPrompt] = useState("");
    const [newPrompt, setNewPrompt] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "luppolino",
            text: "Ciao! 👋 Posso aiutarti a trovare la birra perfetta o consigliarti un abbinamento con qualcosa da mangiare!"
        }
    ]);

    const { answer, isLoading, error } = useAgent(prompt);

    useEffect(() => {

        if (!answer) return;

        setMessages(prev => [
            ...prev,
            {
                sender: "luppolino",
                text: answer
            }
        ]);

    }, [answer]);


    return (
        <div className={styles.container}>

            {isOpen && (
                <LuppolinoChat
                    setMessages={setMessages}
                    setPrompt={setPrompt}
                    setNewPrompt={setNewPrompt}
                    newPrompt={newPrompt}
                    messages={messages}
                    isLoading={isLoading}
                    error={error}
                    close={() => setIsOpen(false)}
                />
            )}

            <button
                className={styles.fab}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Apri la chat con Luppolino"
            >
                <img
                    src={isLoading ? "/imgs/luppolino-pensante.png" : error ? "/imgs/luppolino-triste.png" : "/imgs/luppolino.png"}
                    alt="Luppolino"
                />
            </button>

        </div>
    );
}

export default Luppolino;