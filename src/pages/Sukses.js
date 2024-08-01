import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Nota } from "../components";  // Import komponen Nota
import "../index.css";  // Pastikan untuk menambahkan import CSS ini

const Sukses = () => {
    const location = useLocation();
    const nota = location.state ? location.state.nota : null;

    useEffect(() => {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.forEach((item) => {
                    axios
                        .delete(API_URL + "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }, []);

    const printNota = () => {
        const printContent = document.getElementById('nota-print');
        const WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write('<html><head><title>Nota</title><style>body{font-family: Arial, sans-serif;} table {width: 100%;border-collapse: collapse;} th, td {border: 1px solid #ddd;padding: 8px;text-align: left;} th {background-color: #f2f2f2;}</style></head><body>');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.write('</body></html>');
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    };

    return (
        <div className='mt-4 text-center'>
            {nota && (
                <div>
                    <div id="nota-print" style={{ display: 'none' }}>
                        <Nota nota={nota} />
                    </div>
                    <Nota nota={nota} />
                    <div className="button-container">
                        <Button variant="primary" className='m-2' onClick={printNota}>Cetak Nota</Button>
                        <Button variant="primary" as={Link} to="/">
                            Kembali
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sukses;