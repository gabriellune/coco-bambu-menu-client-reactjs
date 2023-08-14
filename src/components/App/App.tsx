import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProviderComponent } from '../../context/AuthProvider'
import Login from '../Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProviderComponent>
        <Routes>
        <Route path='/' Component={Login} />
        </Routes>
      </AuthProviderComponent>
    </BrowserRouter>
  );
}

export default App;
