// variables
const request = new Fetch;

localStorage.getItem('counter');
localStorage.getItem('sprite');
localStorage.getItem('title');

const counterText = document.querySelector('.encounters');
const resetButton = document.querySelector('.reset');
const munusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const card = document.querySelector('.counter-card-wrapper');

const sprite = document.querySelector('.sprite');
const spriteName = document.querySelector('.pokemon-name');

let counter = 0;
let currentHunt = [];
counterText.textContent = `Encounters: ${counter}`;


// If local storage has anything saved, it loads all previous data
if (localStorage.getItem('counter') != null){
    rememberMe();
}


// event listeners

// handles clicks
card.addEventListener('click', (e) =>{
    
    switch(e.target.className){
        case 'counter-card-content':
            // counter = counter + 1;
            // counterText.textContent = `Encounters: ${counter}`;
            break;
        case 'plus':
            counter = counter + 1;
            counterText.textContent = `Encounters: ${counter}`;
            localStorage.setItem('counter', `${counter}`);
            break;
        case 'minus':
            if(counter > 0){
                counter = counter - 1;
                counterText.textContent = `Encounters: ${counter}`;
                localStorage.setItem('counter', `${counter}`);
            }
            break;
        case 'reset':
            counter = 0;
            counterText.textContent = `Encounters: ${counter}`;
            localStorage.setItem('counter', `${counter}`);
            break;
        case 'search-button':
            doTheThing();
            break;
    }
});


// functions

// requests and returns the wanted data
async function searchPokemon(){

    const userInput = document.querySelector('.search-bar').value.toLowerCase();

    if (userInput != ''){
        data = await request.getData(userInput);
        const pokemonName = await data.name[0].toUpperCase() + data.name.substring(1);
        const normalSprite = await data.sprites.front_default;
        const shinySprite = await data.sprites.front_shiny;

        cardData = [pokemonName, normalSprite, shinySprite]
        return cardData;
    }

};

// displays the data that searchPokemon returns
function displayData(currentHunt){
    const pokeName = currentHunt[0];
    const normalSprite = currentHunt[1];
    const shinySprite = currentHunt[2];

    spriteName.textContent = pokeName;
    localStorage.setItem('name', `${pokeName}`);
    sprite.src = shinySprite;
    localStorage.setItem('sprite', `${shinySprite}`);
};

// combines search and display functions, to be called when search bar searches
async function doTheThing(){

    // Requests pokemon data from API & stores needed values in global variable
    currentHunt = await searchPokemon();
    
    // waits until global variable contains the data, then displays it
    if (currentHunt){
        displayData(await currentHunt); 
        document.querySelector('.search-bar').value = '';
        counter = 0;
        counterText.textContent = `Encounters: ${counter}`;
    }
    
};

// loads previous session
function rememberMe(){
    spriteName.textContent = localStorage.getItem('name');
    sprite.src = localStorage.getItem('sprite');
    counter = Number(localStorage.getItem('counter'));
    counterText.textContent = `Encounters: ${localStorage.getItem('counter')}`;
}
