// Import necessary modules and components
import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import './AddBalanceModal.css';
import { BalanceContext } from '../../Context/BalanceContext';

// Set the app element for the modal
ReactModal.setAppElement('#root');

// Define the AddBalanceModal component
export default function AddBalanceModal({ isOpen, handleCloseModal }) {
    // State for managing the amount input
    const [amount, setAmount] = useState(null);

    // Access the balance and setBalance from the BalanceContext
    const { balance, setBalance } = useContext(BalanceContext);

    // Function to handle adding balance
    const handleAddBalance = () => {
        // Update the balance with the new amount
        const newBalance = balance + Number(amount);
        setBalance(newBalance);

        // Save the updated balance to localStorage
        localStorage.setItem('balance', newBalance);

        // Close the modal and reset the amount
        handleCloseModal();
        setAmount(null);
    };

    // Render the component
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className='AddBalanceModal'
            overlayClassName='AddBalanceModalOverlay'
        >
            <div>
                <h1>Add Income</h1>
                <div className='grid'>
                    <input
                        type="number"
                        placeholder='Income Amount'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button type="submit" className='AddBalance-button' onClick={handleAddBalance}>
                        Add Balance
                    </button>
                    <div>
                        <button type="submit" className='cancel-button' onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
