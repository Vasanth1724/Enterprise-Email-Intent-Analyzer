import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Layout from "./../components/Layout";


ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading Dashboard...</h2>;

  const intentLabels = stats.counts.map(item => item[0]);
  const intentValues = stats.counts.map(item => item[1]);

  return (
    <Layout>
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", fontFamily: "Arial" }}>
      <h1>📊 Email Analytics Dashboard</h1>

      {/* Pie Chart */}
      <div style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
        <Pie
          data={{
            labels: intentLabels,
            datasets: [
              {
                data: intentValues,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#9C27B0"]
              }
            ]
          }}
        />
      </div>

      {/* Recent Predictions Table */}
      <h2 style={{ marginTop: "40px" }}>📄 Recent Predictions</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Intent</th>
            <th>Confidence</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {stats.recent.map((item, index) => (
            <tr key={index}>
              <td>{item.emailText}</td>
              <td>{item.intent}</td>
              <td>{(item.confidence * 100).toFixed(2)}%</td>
              <td>{item.createdAt.replace("T", " ").slice(0, 19)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </Layout>
  );
}

export default Dashboard;
