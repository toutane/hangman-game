// Readable fetchs API
const api = "http://localhost:3001";

// fetch projects
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