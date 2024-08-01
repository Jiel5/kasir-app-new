import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditMenuForm = ({ menu, editMenu }) => {
    const [updatedMenu, setUpdatedMenu] = useState(menu);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMenu({ ...updatedMenu, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editMenu(updatedMenu);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formKode">
                <Form.Label>Kode</Form.Label>
                <Form.Control
                    type="text"
                    name="kode"
                    value={updatedMenu.kode}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                    type="text"
                    name="nama"
                    value={updatedMenu.nama}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formHarga">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                    type="text"
                    name="harga"
                    value={updatedMenu.harga}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    name="is_ready"
                    value={updatedMenu.is_ready}
                    onChange={handleChange}
                >
                    <option value={true}>Tersedia</option>
                    <option value={false}>Tidak Tersedia</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGambar">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                    type="text"
                    name="gambar"
                    value={updatedMenu.gambar}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formKategori">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                    type="text"
                    name="category.nama"
                    value={updatedMenu.category.nama}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button className='mt-3' variant="primary" type="submit">
                Simpan Perubahan
            </Button>
        </Form>
    );
};

export default EditMenuForm;
