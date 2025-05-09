// Import necessary modules and components
import { useContext, useEffect, useState } from "react";
import { ExpenseRatioContext } from "../../Context/ExpenseRatioContext";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useSnackbar } from "notistack";

// Define an array of colors for the pie chart segments
const COLORS = ['#FF9304', '#A000FF', '#FDE006', '#0088FE', '#00C49F', '#FFBB28', '#009072', '#FF7490', '#873399', '#C49F'];

// Define the TrackerChart component
export default function TrackerChart() {
    // Access the expense ratio data from the ExpenseRatioContext
    const { expenseRatio } = useContext(ExpenseRatioContext);

    // State for managing the width of the component
    const [width, setWidth] = useState(window.innerWidth);

    // Effect to handle window resize events
    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', () => setWidth(window.innerWidth));

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', () => setWidth(window.innerWidth));
        };
    }, []);

    // Transform the expense ratio data into a format suitable for the pie chart
    let data = Object.entries(expenseRatio).map(item => {
        return { name: item[0], value: item[1].ratio };
    });

    // Render the component
    return (
        <>
            {/* Only render the chart if there is data */}
            {data.length !== 0 && (
                <div className='Tracker-chart'>
                    {/* Responsive container for the pie chart */}
                    <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {/* Map through the data to create cells for each segment of the pie chart */}
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none' />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Container for the legend items */}
                    <div className="Tracker-chart-labels">
                        {/* Map through the data to create legend items */}
                        {data.map((entry, index) => (
                            <div key={`legend-item-${index}`} style={{
                                display: 'flex', alignItems: 'center',
                            }}>
                                {/* Color box for the legend item */}
                                <div
                                    style={{
                                        width: '26px',
                                        height: '8px',
                                        backgroundColor: COLORS[index % COLORS.length],
                                        marginRight: '5px',
                                    }}
                                ></div>

                                {/* Label for the legend item */}
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    whiteSpace: 'nowrap',
                                    marginRight: '10px',
                                    color: '#FFFFFF'
                                }}>
                                    {entry.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

// Constant for converting degrees to radians
const RADIAN = Math.PI / 180;

// Function to render customized labels for the pie chart segments
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // Calculate the position for the label
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Render the label
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px', fontWeight: '400' }}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
