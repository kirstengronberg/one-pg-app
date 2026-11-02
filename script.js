 const cardContainer = document.getElementById("card-container");
 const prevBtn = document.getElementById("prev-btn");
 const nextBtn = document.getElementById("next-btn");
 let items = [];
 let currentIndex = 0;

async function loadCharacters() {
    try { 
        const firstResponse = await fetch("https://rickandmortyapi.com/api/character");
        if (!firstResponse.ok) throw new Error(`Request failed: $firstResponse.status}`);
        const firstData = await firstResponse.json();
        const count = firstData.info.count;
        const ids = Array.from({ length: count }, (_, i) => i + 1).join(",");
        const response = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    items = await response.json();
    currentIndex = 0;
    updateCarousel();
    } catch(error) {
        cardContainer.textContent = "Failure";
        console.error(error);
    }
}


function updateCarousel() { 
    if (items.length === 0) return;
    const currentItem = items[currentIndex]; 
    cardContainer.innerHTML = ` 
    <div class="card"> <img id="pic" src="${currentItem.image}" alt="${currentItem.name}"> 
    <h2>${currentItem.id}</h2>
    <p id="fact">${currentItem.name} is a ${currentItem.species} and is currently ${currentItem.status}.</p> 
    </div>`;

    prevBtn.disabled = currentIndex === 0; 
    nextBtn.disabled = currentIndex === items.length - 1;
 } prevBtn.addEventListener("click", () => {
 if (currentIndex > 0) { currentIndex--; updateCarousel();
    } });
    nextBtn.addEventListener("click", () => { if (currentIndex < items.length - 1) { currentIndex++; updateCarousel();
     } });
    loadCharacters();      