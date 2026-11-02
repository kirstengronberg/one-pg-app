
async function showRandomCharacter() {
    try {
        const id = Math.floor(Math.random() * 826) + 1; // Random ID between 1 and 826

        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        console.log(data);
        document.getElementById("fact").textContent = `${data.name} is a ${data.species} and is currently ${data.status}.`;
        document.getElementById("pic").src = data.image;
        document.getElementById("pic").alt = data.name;
        document.getElementById('back-btn').addEventListener('click', () => {
            window.history.back();
        });
        console.error("Something went wrong:", error);
    
    }
}

showRandomCharacter(); // Call the function on page load