import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import miniLogo from '../../images/logo-coco-bambu-mini.png';
import iconLogin from '../../images/icon-login.png';

interface NavbarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchWord: string;
  checkOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleSearch, searchWord, checkOut }) => {
  return (
    <div className="nav-bar">
        <Link className="nav-bar-logo" to="/">
          <img src={miniLogo} alt="Logo Coco Bambu" />
        </Link>
      <div className="nav-bar-search">
        <div className="search-bar">
        <input
          placeholder="Buscar Receita..."
          style={{ fontStyle: "italic", fontSize: "12px", width: "250px" }}
          type="text"
          className="input"
          id="searchWord"
          name="searchWord"
          onChange={handleSearch}
          value={searchWord}
        />
        <div className="icon"/>
        </div>
        <div>
        <img src={iconLogin} alt="Sair" width="30" />
          <small className="logout" style={{ color: "white", fontSize: "12px" }}>Sair</small>
        </div>
      </div>
    </div>
  );
}

export default Navbar;