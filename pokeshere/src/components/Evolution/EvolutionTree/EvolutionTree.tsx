import './EvolutionTree.scss';

interface EvolutionTreeProps {
  evolutionChain: string[]; // Массив с именами покемонов
}

const EvolutionTree: React.FC<EvolutionTreeProps> = ({ evolutionChain }) => {
  if (evolutionChain.length === 0) {
    return <p className="evolution-tree__empty">No evolution data available.</p>;
  }

  return (
    <div className="evolution-tree">
      <h2>Evolution Tree</h2>
      <ul>
        {evolutionChain.map((pokemon, index) => (
          <li key={pokemon} className="evolution-tree__item">
            {pokemon}
            {index < evolutionChain.length - 1 && <span className="evolution-tree__arrow">↓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvolutionTree;
