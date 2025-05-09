// Import necessary modules and components
import { useContext } from "react";
import { ExpenseRatioContext } from "../../Context/ExpenseRatioContext";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Define the ExpenseDistributionChart component
export default function ExpenseDistributionChart() {
    // Access the expense ratio data from the ExpenseRatioContext
    const { expenseRatio } = useContext(ExpenseRatioContext);

    // Transform the expense ratio data into a format suitable for the bar chart
    const chartData = Object.entries(expenseRatio).map(([category, data]) => ({
        category,
        ratio: data.ratio
    }));

    // Render the component
    return (
        // Responsive container for the bar chart
        <ResponsiveContainer>
            {/* Display a message if there are no expenses */}
            {Object.keys(expenseRatio).length === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <p style={{ color: 'gray' }}>No Expense Data Available</p>
                </div>
            )}

            {/* Render the bar chart if there are expenses */}
            {Object.keys(expenseRatio).length !== 0 && (
                <BarChart
                    layout="vertical" // Vertical layout for the bar chart
                    width={500} // Width of the bar chart
                    height={300} // Height of the bar chart
                    data={chartData} // Data for the bar chart
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Margins for the bar chart
                >
                    {/* XAxis configuration */}
                    <XAxis type="number" tickLine={false} tick={false} axisLine={false} />

                    {/* YAxis configuration */}
                    <YAxis
                        type="category"
                        dataKey="category"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: 'black' }}
                    />

                    {/* Bar configuration */}
                    <Bar
                        dataKey="ratio"
                        fill="#8884d8"
                        radius={[0, 20, 20, 0]}
                        barSize={20}
                    />
                </BarChart>
            )}
        </ResponsiveContainer>
    );
}
