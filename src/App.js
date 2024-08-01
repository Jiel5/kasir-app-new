import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Home, Sukses, MenuList, LaporanTransaksi } from './pages';

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
            <Route path="/laporan-transaksi" element={<LaporanTransaksi exact />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
