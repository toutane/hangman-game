// Readable fetchs API
// const api = "http://localhost:3001";
const api = "https://hangman-game-be-eklugdbxms.now.sh";

// fetch words
export const getWords = difficulty =>
  fetch(`${api}/words/${difficulty}`, { credentials: "include" }).then(x =>
    x.json()
  );

export const postWords = newWord =>
  fetch(`${api}/words`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(newWord)
  }).then(x => x.json());

// fetch scores
export const getScores = () =>
  fetch(`${api}/scores`, { credentials: "include" }).then(x => x.json());

export const postScore = newScore =>
  fetch(`${api}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(newScore)
  }).then(x => x.json());
