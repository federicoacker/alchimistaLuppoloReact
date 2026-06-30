
import styles from "./LuppolinoChat.module.css";
import Markdown from "react-markdown";

function LuppolinoChat({ close, setMessages, setPrompt, setNewPrompt, newPrompt, messages, isLoading, error }) {

    

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
                            <p>Luppolino sta fermentando...</p>
                        </div>
                    </div>

                )}

                {error && (

                    <div className={styles.errorMessage}>
                        <div className="d-flex align-items-end"> 
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