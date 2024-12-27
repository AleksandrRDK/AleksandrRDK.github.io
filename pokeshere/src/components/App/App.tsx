import './App.scss';
import { useState } from 'react';

import RandomPokemon from '../Encyclopedia/RandomPokemon/RandomPokemon';
import SearchBar from '../Encyclopedia/SearchBar/SearchBar';
import Filters from '../Encyclopedia/Filters/Filters';
import PokemonList from '../Encyclopedia/PokemonList/PokemonList';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string[]) => {
    setFilterQuery(filter);
  };

  return (
    <div className="container">
      <RandomPokemon />
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />
      <PokemonList searchQuery={searchQuery} filterQuery={filterQuery} />
    </div>
  );
}

export default App;
