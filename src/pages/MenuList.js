import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AddMenuForm, EditMenuForm } from '../components';
import { Table, Button, Modal } from 'react-bootstrap';
import { API_URL } from '../utils/constants';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(null);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get(`${API_URL}products`);
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setMenus(response.data);
            } else {
                throw new Error('Data yang diterima bukan array');
            }
        } catch (error) {
            setError(error.message);
            console.error('Error fetching menus:', error);
        }
    };

    const addMenu = async (newMenu) => {
        try {
            await axios.post(`${API_URL}products`, newMenu);
            fetchMenus(); // Refresh menu list
        } catch (error) {
            console.error('Error adding menu:', error);
        }
    };

    const deleteMenu = async (menuId) => {
        try {
            await axios.delete(`${API_URL}products/${menuId}`);
            fetchMenus(); // Refresh menu list
            Swal.fire({
                icon: 'success',
                title: 'Menu berhasil dihapus',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };

    const editMenu = async (updatedMenu) => {
        try {
            await axios.put(`${API_URL}products/${updatedMenu.id}`, updatedMenu);
            fetchMenus(); // Refresh menu list
            setShowEditModal(false); // Close the modal
            Swal.fire({
                icon: 'success',
                title: 'Menu berhasil diedit',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error editing menu:', error);
        }
    };

    const handleEditClick = (menu) => {
        setCurrentMenu(menu);
        setShowEditModal(true);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='m-4'>
            <h1 className='text-center'>Daftar Menu</h1>
            <AddMenuForm addMenu={addMenu} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Gambar</th>
                        <th>Kategori</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id}>
                            <td>{menu.id}</td>
                            <td>{menu.kode}</td>
                            <td>{menu.nama}</td>
                            <td>{menu.harga}</td>
                            <td>{menu.is_ready ? 'Tersedia' : 'Tidak Tersedia'}</td>
                            <td>
                                <img src={menu.gambar} alt={menu.nama} width="50" />
                            </td>
                            <td>{menu.category.nama}</td>
                            <td>
                                <Button variant="warning" className="mx-2" onClick={() => handleEditClick(menu)}>Edit</Button>
                                <Button variant="danger" onClick={() => deleteMenu(menu.id)}>Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentMenu && <EditMenuForm menu={currentMenu} editMenu={editMenu} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MenuList;
