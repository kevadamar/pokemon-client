import { typeColors } from '../../helpers';
import { useHistory, useParams } from 'react-router-dom';

function Card({ data }) {
  const router = useHistory();
  const params = useParams();
  return (
    <div
      className="list__card"
      key={data.id}
      onClick={() => router.push(`/${params.prefix}/${data.name}/detail`)}
    >
      <img alt={data.name} src={data.image} width="150px" height="150px" />

      <h4>{data.name}</h4>

      <div className="card__badge__container">
        {data.types.map((type, index) => (
          <div
            className="card__badge"
            key={index}
            style={{ backgroundColor: `${typeColors[type.name]}` }}
          >
            <h6>{type.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
