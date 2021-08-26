import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { getDataLocalStorage } from '../../helpers';
import { services } from '../../services';

function Home() {
  const router = useHistory();
  const params = useParams();

  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (token) => {
    setIsLoading(true);
    setIsError(false);
    const { data, status } =
      params.prefix === 'pokemon'
        ? await services.getAllPokemon({ page })
        : await services.getAllMyPokemon({ token });

    if (status === 200) {
      setState(data);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.prefix === 'my-pokemon') {
      const token = getDataLocalStorage({ key: 'token' });
      if (!token) {
        router.replace('/pokemon');
      }
      fetchData(token);
    } else if (params.prefix === 'pokemon') {
      fetchData();
    } else {
      router.replace('/auth/login');
    }
    return () => {
      setState([]);
      setIsError(false);
      setIsLoading(false);
    };
  }, [params.prefix]);

  return (
    <>
      {isLoading && <h2>loading . . . .</h2>}
      {isError && <h2>erorr from server.</h2>}
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
        {!isError &&
          state.length > 0 &&
          state.map((data) => <Card data={data} key={data.id} />)}
        {!isLoading && !isError && state.length === 0 && (
          <h2>Silahkan untuk tangkap pokemon mu dulu</h2>
        )}
      </div>
    </>
  );
}

export default Home;
