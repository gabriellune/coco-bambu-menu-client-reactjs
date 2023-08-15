import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProviderComponent } from '../../context/AuthProvider'
import Login from '../Login';
import Dishes from '../Dishes';
import Recipes from '../Recipes';

function App() {
  return (
    <BrowserRouter>
      <AuthProviderComponent>
        <Routes>
        <Route path='/' Component={Login} />
        <Route path='/dishes' Component={Dishes} />
        <Route path='/dishes/:_id' Component={Recipes} />
        </Routes>
      </AuthProviderComponent>
    </BrowserRouter>
  );
}

export default App;
