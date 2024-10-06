import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbars from '../navbar/navbar';
import Sidemenu from '../navbar/sidemenu';
import Footage from '../navbar/footage';
import Home from '../Home/home'; 
import ImportInvoice from '../invoice/invoiceform';
import InvoiceReport from '../invoice/invoicereport';
import '../../asset/css/layout.css';

const Pages = ({ selectedMenuText }) => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fade" timeout={200}>
                <Routes>
                    <Route path="/" element={<Home selectedMenuText={selectedMenuText} />} />
                    <Route path='/importinvoice' element={<ImportInvoice selectedMenuText={selectedMenuText} />} />
                    <Route path='/invoicereport' element={<InvoiceReport selectedMenuText={selectedMenuText} />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

const AppWithRouter = () => {
    const [selectedMenuText, setSelectedMenuText] = useState('');

    return (
        <Router>
            <div id="app">
                <div className="navbar">
                    <Navbars selectedMenuText={selectedMenuText} />
                </div>
                <div className="container">
                    <div className="sidemenu">
                        <Sidemenu setSelectedMenuText={setSelectedMenuText} />
                    </div>
                    <div className="main-content">
                        <Pages selectedMenuText={selectedMenuText} />
                    </div>
                </div>
                <div className="footage">
                    <Footage />
                </div>
            </div>
        </Router>
    );
};

export default AppWithRouter;