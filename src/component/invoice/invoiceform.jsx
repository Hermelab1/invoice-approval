import React, { useState } from 'react';
import axios from 'axios';
import '../../asset/css/invoice.css'
const InvoiceForm = () => {
    const [receiptId, setReceiptId] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try { 
            const response = await axios.post('http://196.191.221.71:5000/api/invoice', { receiptId });
            console.log("Response from backend:", response);
            setInvoiceData(response.data.invoiceData);
            setExpanded(false); // Reset the expand state
        } catch (err) {
            console.error("Error during API call:", err);
            if (err.response) {
                console.error("Error Response data:", err.response.data);
                console.error("Error Response status:", err.response.status);
                setError(err.response.data.message || 'An unexpected error occurred.');
            } else if (err.request) {
                console.error("No response received:", err.request);
                setError('No response received from server.');
            } else {
                console.error("Error setting up request:", err.message);
                setError('An unexpected error occurred. Please check console for details.');
            }
        }
    };

    const handleToggleExpand = () => {
        setExpanded(!expanded); // Toggle the expanded state
    };

    return (
        <div className='invoice-form'>
            <h3>Receipt No.</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={receiptId}
                    onChange={(e) => setReceiptId(e.target.value)}
                    placeholder="Enter Receipt ID"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {invoiceData && (
                <div>
                    <h4>Invoice Detail</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>
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
                            <tr>
                                <td onClick={handleToggleExpand} style={{ cursor: 'pointer' }}> {expanded ? '-' : '+'}</td>
                                <td>{invoiceData.payerName}</td>
                                <td>{invoiceData.telebirraccountnumber}</td>
                                <td>{invoiceData.payeraccounttype}</td>
                                <td>{invoiceData.creditedpartyname}</td>
                                <td>{invoiceData.payertinnumber}</td>
                                <td>{invoiceData.bankaccountnumber}</td>
                                <td>{invoiceData.paymentmode}</td>
                                <td>{invoiceData.reason}</td>
                            </tr>
                            {expanded && (
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
                            )}
                            {expanded && (
                                <tr className='invoicedetail'>
                                    <td></td>
                                    <td>{invoiceData.receiptno}</td>
                                    <td>{invoiceData.paymentdate}</td>
                                    <td>{invoiceData.settledamount}</td>
                                    <td>{invoiceData.stampduty}</td>
                                    <td>{invoiceData.discountamount}</td>
                                    <td>{invoiceData.includingvAT}</td>
                                    <td>{invoiceData.totalpaidamount}</td>
                                    <td>{invoiceData.paymentStatus}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceForm;