import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddMenuForm = ({ addMenu }) => {
    const [show, setShow] = useState(false);
    const [menu, setMenu] = useState({
        kode: '',
        nama: '',
        harga: '',
        gambar: '',  // Menyimpan nama file
        category: { id: '', nama: '' },
        is_ready: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categoryId') {
            let categoryName = '';
            switch (value) {
                case '1':
                    categoryName = 'Makanan';
                    break;
                case '2':
                    categoryName = 'Minuman';
                    break;
                case '3':
                    categoryName = 'Cemilan';
                    break;
                default:
                    categoryName = '';
            }
            setMenu({
                ...menu,
                category: {
                    id: value,
                    nama: categoryName
                }
            });
        } else if (name === 'categoryName') {
            setMenu({
                ...menu,
                category: {
                    id: menu.category.id,
                    nama: value
                }
            });
        } else if (name === 'gambar') {
            const file = e.target.files[0];
            if (file) {
                setMenu({ ...menu, gambar: file.name });  // Simpan nama file
            }
        } else {
            setMenu({ ...menu, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMenu(menu);
        Swal.fire({
            title: 'Menu Berhasil Ditambahkan',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        setMenu({
            kode: '',
            nama: '',
            harga: '',
            gambar: '',
            category: { id: '', nama: '' },
            is_ready: true
        });
        setShow(false);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Tampilkan gambar jika ada
    const imageUrl = menu.gambar ? `/assets/images/${menu.category}/${menu.gambar}` : '';

    return (
        <>
            <Button variant="primary" className='mb-3' onClick={handleShow}>
                Tambah Menu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kode</Form.Label>
                            <Form.Control
                                type="text"
                                name="kode"
                                value={menu.kode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={menu.nama}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={menu.harga}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gambar</Form.Label>
                            <Form.Control
                                type="file"
                                name="gambar"
                                onChange={handleChange}
                                required
                            />
                            {menu.gambar && (
                                <img
                                    src={imageUrl}
                                    alt="Gambar Preview"
                                    style={{ width: '100px', marginTop: '10px' }}
                                />
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select
                                name="categoryId"
                                value={menu.category.id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="1">Makanan</option>
                                <option value="2">Minuman</option>
                                <option value="3">Cemilan</option>
                            </Form.Select>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                value={menu.category.nama}
                                onChange={handleChange}
                                placeholder="Nama Kategori"
                                className="mt-2"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="is_ready"
                                value={menu.is_ready}
                                onChange={handleChange}
                                required
                            >
                                <option value={true}>Tersedia</option>
                                <option value={false}>Tidak Tersedia</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Tambahkan Menu
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddMenuForm;
