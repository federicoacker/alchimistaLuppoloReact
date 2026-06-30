import { useState, useEffect } from "react"
import { BASE_API_URL } from "../data/apiConstants";

function useAgent(promptMessage) {
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLuppolino() {
            setIsLoading(true);

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "prompt": promptMessage })
            };

            try {
                const response = await fetch(`${BASE_API_URL}/agent`, options);
                if (!response.ok) {
                    setError("Non siamo riusciti a contattare Luppolino, pare che sia sbronzo...");
                    setIsLoading(false);
                    return;
                }
                const data = await response.json();
                if (!data?.result) {
                    setError("Luppolino ha bevuto troppo e continua ad avere allucinazioni...");
                    setIsLoading(false);
                    return;
                }
                const answer = data.result;
                setAnswer(answer);
                setIsLoading(false);
            }

            catch (error) {
                setError("Luppolino si è perso... o è stato rapito dalla mafia brassicola...");
                setIsLoading(false);
            }
        }
        if(promptMessage.trim() !== ""){
            fetchLuppolino();
        }
    }, [promptMessage]);

    return {answer, isLoading, error};
}

export default useAgent