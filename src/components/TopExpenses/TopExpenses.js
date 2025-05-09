// Import necessary components and styles
import './TopExpenses.css';
import ExpenseDistributionChart from './TopExpensesChart';

// Define the PrimaryExpenses component
export default function PrimaryExpenses() {
    // Render the component
    return (
        <div className='PrimaryExpenses'>
            <h2>Primary Expenses</h2>
            <div className='PrimaryExpenses-inner'>
                <ExpenseDistributionChart />
            </div>
        </div>
    );
}
