import { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './bar-graph.styles.scss';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
ChartJS.register(...registerables);

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const BarGraph = ({ monument, height, width }) => {
  const [ticketCounts, setTicketCounts] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [label, setLabel] = useState(['', '', '', '', '', '', '']);
  const [data, setData] = useState(null);
  const today = new Date();
  useEffect(() => {
    for (let ticket of monument.tickets) {
      const x = dateDiffInDays(today, new Date(ticket.date));
      // console.log(x);
      if (x <= 6 && x >= 0) {
        setTicketCounts(ticketCounts => {
          ticketCounts[x] =
            ticketCounts[x] + ticket.indianCount + ticket.foreignerCount;
          return ticketCounts;
        });
      }
    }
    // console.log(ticketCounts);
    for (let i = 0; i < 7; i += 1) {
      let date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      setLabel(label => {
        label[i] =
          date.getDate().toString() +
          '/' +
          date.getMonth() +
          '/' +
          date.getFullYear();
        return label;
      });
    }
    setData({
      // Name of the variables on x-axies for each bar
      labels: label,
      datasets: [
        {
          // Label for bars
          label: 'Tickets booked',
          // Data or value of your each variable
          data: ticketCounts,
          // Color of each bar
          backgroundColor: '#2525ff',
          // Border color of each bar
          borderColor: 'black',
          borderWidth: 1
        },
        {
          // Label for bars
          label: 'Expected Crowd',
          // Data or value of your each variable
          // data: predicted,
          data: label.map(() => Math.floor(Math.random() * 13) + 4),
          // Color of each bar
          backgroundColor: 'rgb(0, 255, 255)',
          // Border color of each bar
          borderColor: 'black',
          borderWidth: 1
        }
      ]
    });
  }, [monument]);

  return (
    <div style={{ width: width }}>
      {data ? (
        <Bar
          data={data}
          // Height of graph
          height={height}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                // The y-axis value will start from zero
                beginAtZero: true,
                stepSize: 1
              }
            }
            // plugins: {
            //   legend: {
            //     display: false
            //   }
            // }
          }}
        />
      ) : null}
    </div>
  );
};

export default BarGraph;
