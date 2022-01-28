// variables
const request = new Fetch;

localStorage.getItem('counter');
localStorage.getItem('sprite');
localStorage.getItem('title');
localStorage.getItem('remember');

const counterText = document.querySelector('.encounters');
const container = document.querySelector('.container');

const sprite = document.querySelector('.sprite');
const spriteName = document.querySelector('.pokemon-name');

let counter = 0;
let currentHunt = [];
counterText.textContent = `Encounters: ${counter}`;

// If local storage has anything saved, it loads all previous data
if (localStorage.getItem('remember') === 'true'){
    rememberMe();
}

// event listeners

//keyboard clicks
window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'ArrowRight':
            counter = counter + 1;
            counterText.textContent = `Encounters: ${counter}`;
            localStorage.setItem('counter', `${counter}`);
            break;

        case 'ArrowLeft':
            if(counter > 0){
                counter = counter - 1;
                counterText.textContent = `Encounters: ${counter}`;
                localStorage.setItem('counter', `${counter}`);
            }
            break;
        case 'Enter':
            e.preventDefault();
            document.getElementById('submit').click();
    }
});

// handles clicks
container.addEventListener('click', (e) =>{
    
    switch(e.target.className){
        case 'counter-card-counter':
            counter = counter + 1;
            counterText.textContent = `Encounters: ${counter}`;
            localStorage.setItem('counter', `${counter}`);
            break;

        case 'sprite':
            counter = counter + 1;
            counterText.textContent = `Encounters: ${counter}`;
            localStorage.setItem('counter', `${counter}`);
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

        case 'clear-cache-button':
            clearCache();
            break;

        case 'about-button':
            infoModal();
            break;
            
    }
});


// functions

// requests and returns the wanted data
async function searchPokemon(){

    const userInput = document.querySelector('.search-bar').value.split(' ').join('-').toLowerCase(); // formats pokemon with spaces names, so user doesnt have to insert -'s. example: tapu koko instead of tapu-koko

    if (userInput != ''){
        data = await request.getData(userInput);
        const formattedName = await (data.name[0].toUpperCase() + data.name.substring(1).replace('-', ' ')); // API takes and sends back '-' instead of spaces. this swaps -'s for spaces
        const pokemonName = formattedName;
        const normalSprite = await data.sprites.front_default;
        const shinySprite = await data.sprites.front_shiny;
        cardData = [pokemonName, normalSprite, shinySprite];
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
    localStorage.setItem('remember', true);
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
        localStorage.setItem('counter', 0);
        console.log();
    }
    
};

// loads previous session
function rememberMe(){
    spriteName.textContent = localStorage.getItem('name');
    sprite.src = localStorage.getItem('sprite');
    counter = Number(localStorage.getItem('counter'));
    counterText.textContent = `Encounters: ${localStorage.getItem('counter')}`;
};


// clear cache

function areYouSure(){
    const ask = confirm('Are you sure? This will reset the whole page.');

    return ask;
};

async function clearCache(){
    const youSureBra = await areYouSure();
    if (youSureBra){
        localStorage.clear();
        spriteName.textContent = 'Search Your Pokemon';
        sprite.src = './assets/defaultsprite.gif';
        counter = 0;
        counterText.textContent = `Encounters: ${counter}`;
        localStorage.setItem('remember', false);
    }

};

// open/close about modal

function infoModal(){
    const counterCard = document.querySelector('.counter-card-counter');
    const infoCard = document.querySelector('.counter-card-info');
    const backButton = document.querySelector('.back-button');
    const siteHeader = document.querySelector('.info-bar');
    const headerButtons = document.querySelector('.info-bar');

    siteHeader.style.pointerEvents = 'none';
    counterCard.style.display = 'none';
    infoCard.style.display = 'flex';
    headerButtons.style.opacity = '.6';

    backButton.addEventListener('click', () =>{
        counterCard.style.display = 'flex';
        infoCard.style.display = 'none';
        siteHeader.style.pointerEvents = 'auto';
        headerButtons.style.opacity = '1';
    });

};