const app = document.getElementById("app");
let characters = [];

// PAGE 1: the list of names
function showList() {
    app.innerHTML = "<h2>Character Database</h2>";

    const list = document.createElement("ul");
    characters.forEach(character => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = character.name;
        link.addEventListener("click", event => {
            event.preventDefault();
            showCard(character.id);
        });
        item.appendChild(link);
        list.appendChild(item);
    });

    app.appendChild(list);
}

// PAGE 2 + 3: one character card with Back / Prev / Next
function showCard(id) {
    app.innerHTML = "<p>Loading...</p>";

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            const data = response.data;
            const firstId = characters[0].id;
            const lastId = characters[characters.length - 1].id;

            app.innerHTML = `
                <div class="card">
                    <h2>${data.name}</h2>
                    <img src="${data.image}" alt="${data.name}">
                    <p>ID: ${data.id}</p>
                    <p>Species: ${data.species}</p>
                    <p>Status: ${data.status}</p>
                </div>
                <div class="buttons">
                    <button id="back-btn">Back to list</button>
                    <button id="prev-btn">Previous character</button>
                    <button id="next-btn">Next character</button>
                </div>
            `;

            document.getElementById("back-btn").addEventListener("click", showList);

            const prevBtn = document.getElementById("prev-btn");
            const nextBtn = document.getElementById("next-btn");

            prevBtn.style.visibility = data.id === firstId ? "hidden" : "visible";
            nextBtn.style.visibility = data.id === lastId ? "hidden" : "visible";

            prevBtn.addEventListener("click", () => showCard(data.id - 1));
            nextBtn.addEventListener("click", () => showCard(data.id + 1));
        })
        .catch(error => {
            console.error("Failure:", error);
            app.textContent = "Failure";
        });
}

// On page load: get 5 pages (20 each = 100 characters), then show the list
function loadCharacters() {
    const requests = [];
    for (let page = 1; page <= 5; page++) {
        requests.push(axios.get(`https://rickandmortyapi.com/api/character?page=${page}`));
    }

    Promise.all(requests)
        .then(responses => {
            characters = responses.flatMap(response => response.data.results);
            showList();
        })
        .catch(error => {
            console.error("Failure:", error);
            app.textContent = "Failure";
        });
}

loadCharacters();
