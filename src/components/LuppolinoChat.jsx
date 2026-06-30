import { useState } from "react";
import { useEffect } from "react";
import useAgent from "../hooks/useAgent";
import styles from "./LuppolinoChat.module.css";
import Markdown from "react-markdown";

function LuppolinoChat({ close }) {

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

    function handleSubmit(e) {

        e.preventDefault();

        if (!newPrompt.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: newPrompt
            }
        ]);

        setPrompt(newPrompt);
        setNewPrompt("");
    }

    return (

        <div className={styles.chatBox}>

            <div className={styles.header}>

                <div>
                    <h3>Luppolino 🍺</h3>
                    <p><em>L'apprendista alchimista</em></p>
                </div>

                <button
                    className={styles.close}
                    onClick={close}
                >
                    ✕
                </button>

            </div>

            <div className={styles.body}>

                {messages.map((message, index) => {
                    if (message.sender !== "user") {
                        return (
                            <div key={index} className="d-flex align-items-end justify-content-start">
                                <img src="/imgs/luppolino.png" className={styles.luppolinoImage} />
                                <div className={styles.botMessage}>
                                    <Markdown>
                                        {message.text}
                                    </Markdown>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={index} className="d-flex align-items-end justify-content-end">
                            <div
                                className={
                                    styles.userMessage
                                }
                            >
                                <p>{message.text}</p>
                            </div>
                        </div>
                    );

                })}

                {isLoading && (

                    <div className={styles.botMessage}>
                        <div className="d-flex align-items-end">
                            <img src="/imgs/luppolino-pensante.png" className={styles.luppolinoImage} />
                            <p>Luppolino sta fermentando...</p>
                        </div>
                    </div>

                )}

                {error && (

                    <div className={styles.errorMessage}>
                        <div className="d-flex align-items-end">
                            <img src="/imgs/luppolino-triste.png" className={styles.luppolinoImage} />
                            <p>{error}</p>
                        </div>
                    </div>

                )}

            </div>

            <div className={styles.footer}>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Scrivi un messaggio..."
                        value={newPrompt}
                        onChange={(e) => setNewPrompt(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        ➤
                    </button>

                </form>

            </div>

        </div>

    );

}

export default LuppolinoChat;