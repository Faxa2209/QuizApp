import { useState, useEffect, useRef } from "react";
import "./App.css";
import QuestionList from "./components/QuestionList/QuestionList";

const App = () => {
    const effectRan = useRef(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [showNoQuestionsError, setShowNoQuestionsError] = useState(false);
    const [options, setOptions] = useState([]);
    const [gameOptions, setGameOptions] = useState({
        category: "",
        difficulty: "",
        type: "",
        amount: "5",
    });

    const handleGameStart = () => setGameStarted((prevState) => !prevState);

    const handleNoQuestionsError = (boolean) => setShowNoQuestionsError(boolean);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGameOptions((prevGameOptions) => {
            return {
                ...prevGameOptions,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        if (!effectRan.current) {
            const getUser = async (url) => {
                await fetch(url)
                    .then((res) => res.json())
                    .then((response) => {
                        setOptions(response.trivia_categories);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            getUser("https://opentdb.com/api_category.php");
        }
        return () => {
            effectRan.current = true;
        };
    }, []);

    return (
        <main>
            {gameStarted ? (
                <section className="game-container">
                    <QuestionList
                        gameOptions={gameOptions}
                        handleGameStart={handleGameStart}
                        handleNoQuestionsError={handleNoQuestionsError}
                    />
                </section>
            ) : (
                <section className="game-intro">
                    <h1 className="game-title">Quizzical</h1>
                    <p className="game-text">Answer the questions and test your knowledge!</p>

                    {showNoQuestionsError && (
                        <h2 className="noQuestions-text">Oops! We couldn't find any questions with these options!</h2>
                    )}

                    <div className="gameOptions-container">
                        <div className="select-container">
                            <label className="custom-label" htmlFor="category">
                                Category:
                            </label>

                            <select
                                name="category"
                                id="category"
                                className="custom-select"
                                value={gameOptions.category}
                                onChange={handleChange}
                            >
                                <option value="">Any Category</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="select-container">
                            <label className="custom-label" htmlFor="difficulty">
                                Difficulty:
                            </label>

                            <select
                                name="difficulty"
                                id="difficulty"
                                className="custom-select"
                                value={gameOptions.difficulty}
                                onChange={handleChange}
                            >
                                <option value="">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        {/* <div className="select-container">
                            <label className="custom-label" htmlFor="type">
                                Type of questions:
                            </label>

                            <select
                                name="type"
                                id="type"
                                className="custom-select"
                                value={gameOptions.type}
                                onChange={handleChange}
                            >
                                <option value="">Any Type</option>
                                <option value="multiple">Multiple Choice</option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div> */}
                        <div className="select-container">
                            <label className="custom-label" htmlFor="type">
                                Amount of questions:
                            </label>

                            <select
                                name="amount"
                                id="amount"
                                className="custom-select"
                                value={gameOptions.amount}
                                onChange={handleChange}
                            >
                                <option value="">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn-primary" onClick={handleGameStart}>
                        Start Quiz
                    </button>
                </section>
            )}
        </main>
    );
};

export default App;
