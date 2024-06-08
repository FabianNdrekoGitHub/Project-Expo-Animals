


async function fetchData() {
    try {
        const birdName = document.getElementById("search-input").value;

        const response = await fetch(`https://freetestapi.com/api/v1/birds?search=${birdName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        const searchResults = document.querySelector(".search-results");
        searchResults.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(bird => {
                const birdImage = bird.image;
                
                const newSearchResult = document.createElement("div");
                newSearchResult.className = "search-result";

                const imgElement = document.createElement("img");
                imgElement.src = birdImage;
                imgElement.alt = bird.name;

                const linkElement = document.createElement("a");
               
                linkElement.textContent = bird.name;
                linkElement.addEventListener('click', (event)=>{
                    event.preventDefault();
                    showDetails(bird);
                });


                newSearchResult.appendChild(imgElement);
                newSearchResult.appendChild(linkElement);
                searchResults.appendChild(newSearchResult);
            });
        } else {
            throw new Error("No birds found with the provided search criteria");
        }
    } catch (error) {
        console.error(error);
    }
}




function getRandomSeed() {
    const date = new Date();
    return date.getFullYear() + date.getMonth() + date.getDate();
}

async function fetchRandomPhotos(numPhotos) {
    try {
        const seed = getRandomSeed(); 
        const response = await fetch(`https://freetestapi.com/api/v1/birds?seed=${seed}`);

        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();
        const photos = data.slice(0, numPhotos); 
        return photos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function displayRandomPhotos(numPhotos) {
    const photos = await fetchRandomPhotos(numPhotos);

    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';

    photos.forEach(photo => {
        const newSearchResult = document.createElement('div');
        newSearchResult.className = 'search-result';

        const imgElement = document.createElement('img');
        imgElement.src = photo.image;
        imgElement.alt = photo.name;

        const linkElement = document.createElement('a');
        
        linkElement.textContent = photo.name;
        linkElement.addEventListener('click', (event)=>{
            event.preventDefault();
            showDetails(photo);
        });


        newSearchResult.appendChild(imgElement);
        newSearchResult.appendChild(linkElement);
        searchResults.appendChild(newSearchResult);
    });
}

displayRandomPhotos(48);








function showDetails(bird) {
    const detailsElement = document.getElementById('animal-details');
    const detailsContent = document.getElementById('animal-details-content');
    
    detailsElement.querySelector('.details-title').textContent = bird.name;
    detailsElement.querySelector('#species').textContent = bird.species || 'Unknown Category';
    detailsElement.querySelector('#details-description').textContent = bird.description || 'No description available.';
    detailsElement.querySelector('#family').textContent = bird.family || 'Not known';
    detailsElement.querySelector('#habitat').textContent = bird.habitat || 'Not known';
    detailsElement.querySelector('#place-of-found').textContent = bird.place_of_found || 'Not known';
    detailsElement.querySelector('#weight').textContent = bird.weight_kg || 'Not known';
    detailsElement.querySelector('#wingspan').textContent = bird.wingspan_cm || 'Not known';
    detailsElement.querySelector('#details-image').src = bird.image || 'placeholder.jpg';
    // detailsElement.querySelector('#details-image').alt = bird.name;

    detailsElement.classList.add('showDetails');
}

function closeDetails() {
    const detailsElement = document.getElementById('animal-details');
    detailsElement.classList.remove('showDetails');
}



