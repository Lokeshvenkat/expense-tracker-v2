// Import necessary components
import TopExpenses from '../components/TopExpenses/TopExpenses';
import Tracker from '../components/Tracker/Tracker';
import Transactions from '../components/Transactions/Transactions';

// Import the CSS file for styling the HomePage component
import './Main.css';

// Define the HomePage component
function MainPage() {
    // Render the component
    return (
        // Main container for the HomePage
        <div className="HomePage">
            {/* Tracker component for displaying tracking information */}
            <Tracker></Tracker>

            {/* Container for the bottom section of the HomePage */}
            <div className='bottom'>
                {/* Transaction component for displaying transaction information */}
                <Transactions></Transactions>

                {/* TopExpenses component for displaying top expenses information */}
                <TopExpenses></TopExpenses>
            </div>
        </div>
    );
}

// Export the HomePage component as the default export
export default MainPage;
