import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

function TotalBayarWrapper(props) {
    const navigate = useNavigate();
    return <TotalBayar {...props} navigate={navigate} />;
}

class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL + "pesanans", pesanan).then((res) => {
            this.props.navigate('/sukses');
        })
    };

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);

        return (
            <>
                {/* Web */}
                <div className="fixed-bottom d-none d-md-block">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga :{" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalBayar)}
                                </strong>
                            </h4>
                            <Button
                                variant="primary"
                                className="w-100 mb-2 mt-4"
                                size="lg"
                                onClick={() => this.submitTotalBayar(totalBayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* Mobile  */}
                <div className="d-sm-block d-md-none">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga :{" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalBayar)}
                                </strong>
                            </h4>
                            <Button
                                variant="primary"
                                className="w-100 mb-2 mt-4"
                                size="lg"
                                onClick={() => this.submitTotalBayar(totalBayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default TotalBayarWrapper;
