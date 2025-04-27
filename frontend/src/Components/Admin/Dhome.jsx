import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function Dhome() {
    const [data, setData] = useState({
        totalUsers: 0,          // Total users with role "user"
        totalAdmins: 0,         // Total users with role "admin"
        subscribedUsers: 0,     // Users with subscription = 1
        unsubscribedUsers: 0,   // Users with subscription = 0
    });
    const [error, setError] = useState(''); // State to handle errors

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/dashboard'); // API call
                console.log(response)
                const {
                    totalUsers,
                    totalAdmins,
                    subscribedUsers,
                    unsubscribedUsers,
                } = response.data; // Destructure response data

                // Update state with API data
                setData({
                    totalUsers,
                    totalAdmins,
                    subscribedUsers,
                    unsubscribedUsers,
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    // Data for the pie chart
    const pieData = [
        { name: 'Total Users', value: data.totalUsers },
        { name: 'Subscribed Users', value: data.subscribedUsers },
        { name: 'Unsubscribed Users', value: data.unsubscribedUsers },
        { name: 'Total Admins', value: data.totalAdmins },
    ];

    // Colors for the pie chart sections
    const colors = ['#1E90FF', '#FFA500', '#32CD32', '#FF6347']; // Blue, Orange, Green, Red

    return (
        <main className="main-container">
            <div style={{ color: '#2f22f2' }}>
                <h1>Dashboard</h1>
            </div>

            {/* Display cards */}
            <div className="main-cards">
                {/* Total Users */}
                <div className="card">
                    <div className="card-inner">
                        <h3>Total Users</h3>
                        <BsFillArchiveFill className="card_icon" />
                    </div>
                    <h1>{data.totalUsers}</h1>
                </div>

                {/* Subscribed Users */}
                <div className="card">
                    <div className="card-inner">
                        <h3>Subscribed Users</h3>
                        <BsFillGrid3X3GapFill className="card_icon" />
                    </div>
                    <h1>{data.subscribedUsers}</h1>
                </div>

                {/* Unsubscribed Users */}
                <div className="card">
                    <div className="card-inner">
                        <h3>Unsubscribed Users</h3>
                        <BsFillBellFill className="card_icon" />
                    </div>
                    <h1>{data.unsubscribedUsers}</h1>
                </div>

                {/* Total Admins */}
                <div className="card">
                    <div className="card-inner">
                        <h3>Admins</h3>
                        <BsFillBellFill className="card_icon" />
                    </div>
                    <h1>{data.totalAdmins}</h1>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="charts">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    );
}

export default Dhome;
