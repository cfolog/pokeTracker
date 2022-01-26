
class Fetch {
    
    async getData(name){

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json()

        return data;
    }

}
