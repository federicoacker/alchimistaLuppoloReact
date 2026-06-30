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
            text: "Ciao! 👋 Posso aiutarti a trovare la birra perfetta, consigliarti un abbinamento oppure spiegarti le differenze tra gli stili!"
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
                        console.log("test");
                        return (
                            <div  key={index} className={styles.botMessage}>
                                <Markdown>
                                    {message.text}
                                </Markdown>
                            </div>
                        );
                    }
                    return (<div
                        key={index}
                        className={
                            message.sender === "user"
                                ? styles.userMessage
                                : styles.botMessage
                        }
                    >
                        <p>{message.text}</p>
                    </div>);

                })}

                {isLoading && (

                    <div className={styles.botMessage}>
                        <p>⚗️ Luppolino sta fermentando...</p>
                    </div>

                )}

                {error && (

                    <div className={styles.errorMessage}>
                        <p>{error}</p>
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