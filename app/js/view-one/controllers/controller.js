class ViewOneController {
  static get $inject() {
    return ['CountStore', '$http'];
  }

  constructor(CountStore, $http) {
    this.CountStore = CountStore;
    this.http = $http;
    // this.pokemons =['a','b','c'];
    this.pokemons = [];
    this.init();
  }

  init() {
    this.name = 'ONE';
    this.CountStore.increment();
    this.getPokemons();

  }

  getPokemons() {
    this.http.get('https://pokeapi.co/api/v2/pokemon').then(
      (response) => {
        this.pokemons = response.data.results;
        this.getPokemonDetails();
      }, this,
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );
  }

  getPokemonDetails() {
    this.pokemons.forEach((pokemon) => {
      this.http.get(pokemon.url).then(
        (response) => {
          pokemon.info = response.data;
        }, this,
        function errorCallback(response) {
          console.log("Unable to perform get request");
        }
      );
    })

  }
}

export default ViewOneController;
