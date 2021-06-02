'use strict';

const filmSelect = document.querySelector('#filmSelect');
const defaultFilm = "A New Hope";

function fetchFilms() {
    fetch(
        'https://swapi.dev/api/films/'
    ).then((response) => {
        return response.json();
    }).then((data) => {
        updateForm(data);
    })
}

function updateForm(data) {
    const filmData = data.results;

    const selectElement = document.createElement('select');

    filmData.forEach((film) => {
        const filmOption = document.createElement('option');
        filmOption.value = film.title;
        filmOption.text = film.title;
        selectElement.append(filmOption);
    });

    filmSelect.append(selectElement);

    filmSelect.addEventListener('change', (event) => {
        const filmName = event.target.value;
        fetchFilmData(filmName);
    })
}

function fetchFilmData(film) {
    fetch(
        `https://swapi.dev/api/films/?search=${film}`
    ).then((response) => {
        return response.json();
    }).then((data) => {
        buildFilmResults(data);
    })
}

function buildFilmResults(data) {
    const filmResults = document.querySelector('#filmResults');
    filmResults.innerHTML = "";

    const filmData = data.results[0];

    const filmTitle = document.createElement('p');
    const filmEpisodeNumber = document.createElement('p');
    const filmDirector = document.createElement('p');
    const filmProducer = document.createElement('p');
    const filmReleaseDate = document.createElement('p');
    
    filmTitle.innerHTML = `<strong>Title:</strong> ${filmData.title}`;
    filmEpisodeNumber.innerHTML = `<strong>Episode:</strong> ${filmData.episode_id}`;
    filmDirector.innerHTML = `<strong>Director:</strong> ${filmData.director}`;
    filmProducer.innerHTML = `<strong>Producer:</strong> ${filmData.producer}`;
    filmReleaseDate.innerHTML = `<strong>Release Date:</strong> ${filmData.release_date}`;

    filmResults.append(filmTitle);
    filmResults.append(filmEpisodeNumber);
    filmResults.append(filmDirector);
    filmResults.append(filmProducer);
    filmResults.append(filmReleaseDate);
    
    const characters = filmData.characters;

    const charactersTitle = document.createElement('p');
    charactersTitle.innerHTML = "<strong>Characters:</strong>";

    const charactersList = document.createElement('ul');

    filmResults.append(charactersTitle);
    filmResults.append(charactersList);

    characters.forEach((character) => {
        fetchCharacterName(character);
    });

}

function fetchCharacterName(url) {
    fetch(
        url
    ).then((response) => {
        return response.json();
    }).then((data) => {
        updateCharacterList(data);
    });

}

function updateCharacterList(data) {

    const charactersList = document.querySelector('ul');

    const characterElement = document.createElement('li');
    characterElement.innerText = data.name;

    charactersList.append(characterElement);
}


fetchFilms();
fetchFilmData(defaultFilm);