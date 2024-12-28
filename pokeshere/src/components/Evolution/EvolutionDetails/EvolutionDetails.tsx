import './EvolutionDetails.scss';

interface EvolutionDetailsProps {
  name: string;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}

const EvolutionDetails: React.FC<EvolutionDetailsProps> = ({ name, types, abilities, stats }) => {
  return (
    <div className="evolution-details">
      <h2 className="evolution-details__title">{name}</h2>
      <div className="evolution-details__info">
        <div className="evolution-details__section">
          <h3>Types:</h3>
          <ul>
            {types.map((type, index) => (
              <li key={index} className="evolution-details__type">
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className="evolution-details__section">
          <h3>Abilities:</h3>
          <ul>
            {abilities.map((ability, index) => (
              <li key={index} className="evolution-details__ability">
                {ability}
              </li>
            ))}
          </ul>
        </div>
        <div className="evolution-details__section">
          <h3>Stats:</h3>
          <ul>
            {stats.map((stat, index) => (
              <li key={index} className="evolution-details__stat">
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvolutionDetails;
