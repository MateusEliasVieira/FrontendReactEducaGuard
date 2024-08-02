import { useEffect, useState } from 'react';
import './App.css';
import PasswordInput from './components/PasswordInput.jsx'; // Certifique-se de que o nome do arquivo está correto

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    let tokenUrl = window.location.href.split("?token=")[1]
    setToken(tokenUrl);
  }, []);

  return (
    <div id="form">
      <h3>Recuperação de Conta</h3>
      <PasswordInput token={token} />
      <p>Educa Guard V1.0</p>
    </div>
  );
}

export default App;
