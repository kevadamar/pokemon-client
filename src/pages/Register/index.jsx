import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDataLocalStorage, saveToLocalStorage } from '../../helpers';
import { services } from '../../services';

function Register() {
  const router = useHistory();
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    username: '',
  });

  const postLogin = async (e) => {
    e.preventDefault();

    const { data } = await services.register({ payload });

    saveToLocalStorage({ key: 'token', payload: data.token });
    router.replace('/pokemon');
    router.go(0);
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setPayload((currentState) => ({ ...currentState, [name]: value }));
  };

  useEffect(() => {
    const token = getDataLocalStorage({ key: 'token' });
    if (token) {
      router.replace('/pokemon');
    }
  }, []);

  return (
    <div className="login__container">
      <form onSubmit={postLogin} className="login__form">
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
            onChange={onChange}
          />
        </label>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="example"
            required
            onChange={onChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            required
            onChange={onChange}
          />
        </label>
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
