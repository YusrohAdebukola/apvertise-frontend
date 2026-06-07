import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const APIM_URL = 'https://apvertise-apim.azure-api.net/analytics';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${APIM_URL}/campaigns/stats`)
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  const barData = {
    labels: stats.campaignNames,
    datasets: [{
      label: 'Influencer Applications',
      data: stats.applicationCounts,
      backgroundColor: '#4F8EF7'
    }]
  };

  const doughnutData = {
    labels: ['Active', 'Completed', 'Pending'],
    datasets: [{
      data: [stats.active, stats.completed, stats.pending],
      backgroundColor: ['#4F8EF7', '#2ECC71', '#F39C12']
    }]
  };

  return (
    <div style={{padding: '2rem'}}>
      <h2>Campaign Analytics</h2>
      <div style={{display: 'flex', gap: '2rem'}}>
        <div style={{flex: 2}}>
          <Bar data={barData} />
        </div>
        <div style={{flex: 1}}>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}
