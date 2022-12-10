const getQuestions = (gameOptions) => {
    const { category, difficulty, type, amount } = gameOptions;

    let categoryQueryParam = "";
    let difficultyQueryParam = "";
    let typeQueryParam = "";
    let amountQueryParam = "";

    if (category !== "") categoryQueryParam = `&category=${category}`;

    if (difficulty !== "") difficultyQueryParam = `&difficulty=${difficulty}`;

    if (type !== "") typeQueryParam = `&type=${type}`;
    if (amount !== "") {
        amountQueryParam = `amount=${amount}`;
    } else {
        amountQueryParam = `amount=5`;
    }

    let apiUrl = `https://opentdb.com/api.php?${amountQueryParam}${categoryQueryParam}${difficultyQueryParam}${typeQueryParam}`;

    return fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => data.results);
};

export default getQuestions;
