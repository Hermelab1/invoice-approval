// src/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../asset/css/invoiceform.css'

const InvoiceReport = () => {
    const [invoiceData, setInvoiceData] = useState([]); // Initialize as an empty array
    const [filteredData, setFilteredData] = useState([]); // State for filtered data
    const [filter, setFilter] = useState(""); // State for filter input
    const [error, setError] = useState(null);
    const [expandedRowId, setExpandedRowId] = useState(null); // State for tracking the expanded row

    const handleToggleExpand = (id) => {
        setExpandedRowId(prevExpandedRowId => prevExpandedRowId === id ? null : id);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/invoicereport');
                console.log("Response from backend:", response);

                if (Array.isArray(response.data)) {
                    setInvoiceData(response.data); // Set data directly since the response is an array
                    setFilteredData(response.data); // Initialize filtered data with all invoices
                } else {
                    setError('Invalid data format received.'); // Update error message
                    console.error('Received data:', response.data);
                }
            } catch (err) {
                console.error("Error during API call:", err);

                if (err.response) {
                    setError(err.response.data.message || 'An unexpected error occurred.');
                } else if (err.request) {
                    setError('No response received from server.');
                } else {
                    setError('An unexpected error occurred. Please check console for details.');
                }
            }
        };

        fetchData();
    }, []);

    // Filter function
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        const filtered = invoiceData.filter(item =>
            item.payerName.toLowerCase().includes(value.toLowerCase()) || // Filter by Payer Name
            item.telebirraccountnumber.includes(value) || // Filter by Telebirr Account Number
            item.payeraccounttype.toLowerCase().includes(value.toLowerCase()) // Add other filter conditions as needed
        );
        setFilteredData(filtered);
    };

    return (
        <div className='invoicereport'>
            <h4>Invoice Detail</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if there is one */}
            
            <input
                type="text"
                placeholder="Filter by Payer Name, Telebirr Account, etc."
                value={filter}
                onChange={handleFilterChange}
            />

            {filteredData.length === 0 ? ( /* Check if filteredData is empty */
                <p>Loading invoice data...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th >   
                            </th>
                            <th>Payer Name</th>
                            <th>Telebirr Account Number</th>
                            <th>Payer Account Type</th>
                            <th>Credited Party Name</th>
                            <th>Payer TIN Number</th>
                            <th>Bank Account Number</th>
                            <th>Payment Mode</th>
                            <th>Payment Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data) => (
                            <React.Fragment key={data._id}> {/* Use a unique key */}
                                <tr>
                                    <td onClick={() => handleToggleExpand(data._id)} style={{ cursor: 'pointer' }}> 
                                        {expandedRowId === data._id ? '-' : '+'}
                                    </td>
                                    <td>{data.payerName}</td>
                                    <td>{data.telebirraccountnumber}</td>
                                    <td>{data.payeraccounttype}</td>
                                    <td>{data.creditedpartyname}</td>
                                    <td>{data.payertinnumber}</td>
                                    <td>{data.bankaccountnumber}</td>
                                    <td>{data.paymentmode}</td>
                                    <td>{data.reason}</td>
                                </tr>
                                {expandedRowId === data._id && (
                                    <>
                                        <tr className='invoicedetail'>
                                            <td colSpan={1}></td>
                                            <td>Receipt No</td>
                                            <td>Payment Date</td>
                                            <td>Settled Amount</td>
                                            <td>Stamp Duty</td>
                                            <td>Discount Amount</td>
                                            <td>Including VAT</td>
                                            <td>Total Paid Amount</td>
                                            <td>Payment Status</td>
                                        </tr>
                                        <tr className='invoicedetail'>
                                            <td></td>
                                            <td>{data.receiptno}</td>
                                            <td>{data.paymentdate}</td>
                                            <td>{data.settledamount}</td>
                                            <td>{data.stampduty}</td>
                                            <td>{data.discountamount}</td>
                                            <td>{data.includingvAT}</td>
                                            <td>{data.totalpaidamount}</td>
                                            <td>{data.paymentStatus}</td>
                                        </tr>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InvoiceReport;