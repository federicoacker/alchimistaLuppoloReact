import { useState } from "react";
import useAgent from "../hooks/useAgent"

function TestAgent() {
    const [prompt, setPrompt] = useState("");
    const [newPrompt, setNewPrompt] = useState("");
    const {answer, isLoading, error} = useAgent(prompt);
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault();
            setPrompt(newPrompt);
        }}>
            <input type="text" onChange={(e)=>{
                const value = e.target.value;
                setNewPrompt(value);
            }}/>
        </form>

        {isLoading ? <p>Luppolino sta fermentando...</p> : error ? <p>{error}</p> : <p>{answer}</p>}
    </div>
  )
}

export default TestAgent