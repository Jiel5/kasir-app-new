import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";
import { format } from 'date-fns';

const LaporanTransaksi = () => {
    const [pesanans, setPesanans] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchPesanans();
    }, []);

    const fetchPesanans = () => {
        axios.get(`${API_URL}pesanans`)
            .then(response => {
                setPesanans(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the pesanans!", error);
            });
    };

    const handleFilter = () => {
        let url = `${API_URL}pesanans?`;

        if (startDate) url += `date_gte=${startDate}&`;
        if (endDate) url += `date_lte=${endDate}&`;
        if (category) url += `menus.product.category.nama_like=${category}&`;

        // Log the URL for debugging
        console.log("API URL for Filter: ", url);

        axios.get(url)
            .then(response => {
                setPesanans(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the filtered pesanans!", error);
            });
    };

    const handleSearch = () => {
        let url = `${API_URL}pesanans?menus.product.nama_like=${keyword}`;

        // Log the URL for debugging
        console.log("API URL for Search: ", url);

        axios.get(url)
            .then(response => {
                setPesanans(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the searched pesanans!", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}pesanans/${id}`)
            .then(response => {
                fetchPesanans();
            })
            .catch(error => {
                console.error("There was an error deleting the pesanan!", error);
            });
    };

    const handlePrint = () => {
        const printContent = document.getElementById('laporan-print');
        const WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write('<html><head><title>Laporan Transaksi</title><style>body{font-family: Arial, sans-serif;} table {width: 100%;border-collapse: collapse;} th, td {border: 1px solid #ddd;padding: 8px;text-align: left;} th {background-color: #f2f2f2;}</style></head><body>');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.write('</body></html>');
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    };

    return (
        <div className="m-4">
            <h4><strong>Laporan Transaksi</strong></h4>
            <hr />
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Cemilan">Cemilan</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="align-self-end">
                        <Button variant="primary" className="mx-2" onClick={handleFilter}>Filter</Button>
                        <Button variant="success" className="ml-2" onClick={handlePrint}>Print</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId="keyword">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search by product name"
                            />
                        </Form.Group>
                    </Col>
                    <Col className="align-self-end">
                        <Button variant="primary" onClick={handleSearch}>Search</Button>
                    </Col>
                </Row>
            </Form>
            <div id="laporan-print">
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tanggal</th>
                            <th>Kategori</th>
                            <th>Nama Produk</th>
                            <th>Jumlah</th>
                            <th>Total Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesanans.length > 0 ? pesanans.map((pesanan, index) => (
                            pesanan.menus.map((menu, idx) => (
                                <tr key={`${index}-${idx}`}>
                                    <td>{index + 1}</td>
                                    <td>{format(new Date(pesanan.date), 'dd-MM-yyyy')}</td>
                                    <td>{menu.product.category.nama}</td>
                                    <td>{menu.product.nama}</td>
                                    <td>{menu.jumlah}</td>
                                    <td>{numberWithCommas(menu.total_harga)}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(pesanan.id)}>Hapus</Button>
                                    </td>
                                </tr>
                            ))
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center">Tidak ada data transaksi</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default LaporanTransaksi;
