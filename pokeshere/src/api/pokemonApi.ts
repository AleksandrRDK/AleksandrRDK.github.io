import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (limit: number = 10, offset: number = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const pokemonDetailsPromises = response.data.results.map((pokemon: { name: string }) =>
      fetchPokemonDetails(pokemon.name)
    );
    const pokemons = await Promise.all(pokemonDetailsPromises);
    return pokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Failed to fetch pokemons');
  }
};

export const fetchPokemonDetails = async (nameOrId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map((type: { type: { name: string } }) => type.type.name),
    };
  } catch (error) {
    console.error(`Error fetching details for ${nameOrId}:`, error);
    throw new Error(`Failed to fetch details for ${nameOrId}`);
  }
};


export const fetchRandomPokemon = async (maxId: number) => {
  const randomId = Math.floor(Math.random() * maxId) + 1;
  try {
    const [response, speciesResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/pokemon/${randomId}`),
      axios.get(`${API_BASE_URL}/pokemon-species/${randomId}`),
    ]);

    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'en'
    );

    const randomPokemon = {
      name: response.data.name,
      types: response.data.types.map((type: { type: { name: string } }) => type.type.name),
      stats: response.data.stats.map((stat: { stat: { name: string }, base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      image: response.data.sprites.front_default,
      description: descriptionEntry ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'No description available.',
    };

    return randomPokemon;
  } catch (error) {
    console.error('Error fetching random pokemon:', error);
    throw new Error('Failed to fetch random pokemon');
  }
};
