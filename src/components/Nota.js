import React from "react";
import "../index.css";  // Import CSS untuk komponen Nota

const Nota = ({ nota }) => {
    return (
        <div className="nota-container">
            <h3>Nota Pembayaran</h3>
            <p>ID Nota: {nota.id}</p>
            <table className="nota-table">
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {nota.menus.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.nama}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.product.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="nota-total">Total Bayar: Rp. {nota.total_bayar}</p>
        </div>
    );
};

export default Nota;
