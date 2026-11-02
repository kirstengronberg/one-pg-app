const card = document.getElementById("card-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let characters = [];
let index = 0;

function render() {
    const currentItem = characters[index];
    card.innerHTML = `
        <div class="card">
            <img id="pic" src="${currentItem.image}"alt="${currentItem.name}">
            <p id="fact">${currentItem.name} is a ${currentItem.species} and is currently ${currentItem.status}.</p>
            <p>ID: ${currentItem.id}</p>
        </div>
    `;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === characters.length - 1;
}

function loadCharacters() {
    const requests = [];
    for (let page = 1; page <= 5; page++) {
        requests.push(axios.get(`https://rickandmortyapi.com/api/character?page=${page}`));
    }

    Promise.all(requests)
        .then(responses => {
            characters = responses.flatMap(response => response.data.results);
            render();
        })
        .catch(error => {
            console.error("Failure:", error);
            card.textContent = "Failure";
        });
}

nextBtn.addEventListener("click", () => {
    if (index < characters.length - 1) {
        index++;
        render();
    }
});

prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        render();
    }
});

loadCharacters();
