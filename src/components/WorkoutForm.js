import React, {useState} from 'react';
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSumbit = async (event) => {
        event.preventDefault();

        const workout = {
            title,
            load,
            reps
        }

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);


            console.log("new workout added");
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <div>
            <form className="create" onSubmit={handleSumbit}>
                <h3>Add a New Workout</h3>

                <label htmlFor="">Excersize Title:</label>
                <input
                    type="text"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                    className={emptyFields.includes("title") ? "error" : ""}
                />

                <label htmlFor="">Load (in kg):</label>
                <input
                    min={0}
                    type="number"
                    onChange={event => setLoad(event.target.value)}
                    value={load}
                    className={emptyFields.includes("load") ? "error" : ""}
                />

                <label htmlFor="">Reps:</label>
                <input
                    min={0}
                    type="number"
                    onChange={event => setReps(event.target.value)}
                    value={reps}
                    className={emptyFields.includes("reps") ? "error" : ""}
                />

                <button>Add workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default WorkoutForm;