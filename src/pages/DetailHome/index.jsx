import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getDataLocalStorage, typeColors } from '../../helpers';
import { services } from '../../services';

function DetailHome() {
  const params = useParams();
  const router = useHistory();

  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    const { data, status } = await services.getPokemon({ name: params.name });

    if (status === 200) {
      setMsg(data.is_user);
      setIsError(false);
      setState(data);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const catchPokemon = async () => {
    const { message } = await services.bidPokemon({
      pokemon_id: state.id,
      token,
    });
    setIsDisabled(true);
    alert(message);
    setTimeout(() => {
      setIsDisabled(false);
      fetchData();
    }, 800);
  };

  useEffect(() => {
    const token = getDataLocalStorage({ key: 'token' });
    if (!token) {
      router.push('/auth/login');
    } else {
      setToken(token);
      fetchData();
    }

    return () => {
      setState([]);
      setIsError(false);
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      {isLoading && <h2>loading . . . .</h2>}
      {isError && <h2>erorr from server.</h2>}

      {!isLoading && !isError && state && (
        <div className="detail__container">
          <div className="detail__card" key={state.id}>
            <img
              alt={state.name}
              src={state.image}
              width="150px"
              height="150px"
            />

            <h1>{state.name}</h1>

            <h3>Height : {state.height} mm</h3>
            <h3>Weight : {state.weight} kg</h3>

            <h3>Ability</h3>
            <div className="card__badge__container">
              {state.abilities.map((ability, index) => (
                <div
                  className="card__badge"
                  key={index}
                  style={{
                    backgroundColor: '#e23f3f',
                    color: 'white',
                    marginBottom: '20px',
                  }}
                >
                  <h6>{ability.name}</h6>
                </div>
              ))}
            </div>

            <h3>Type</h3>
            <div className="card__badge__container">
              {state.types.map((type, index) => (
                <div
                  className="card__badge"
                  key={index}
                  style={{ backgroundColor: `${typeColors[type.name]}` }}
                >
                  <h6>{type.name}</h6>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              {params.prefix === 'pokemon' ? (
                <>
                  {state.is_hidden ? (
                    <h2>"{msg}"</h2>
                  ) : (
                    <button disabled={isDisabled} onClick={catchPokemon}>
                      Catch Pokemon
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h6>Wanted Pokemon : </h6>
                  <section>
                    <input type="text" list="list-catch" />
                    <datalist id="list-catch">
                      <option value="1">Bulbasur</option>
                      <option value="2">Buaya</option>
                    </datalist>
                  </section>
                  <br />
                  <button>Exchange Pokemon</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailHome;
