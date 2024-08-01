import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Home, Sukses, MenuList } from './pages';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/sukses" element={<Sukses exact />} />
            <Route path="/menuList" element={<MenuList exact />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
