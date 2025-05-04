const tradeLink = `https://tradestie.com/api/v1/apps/reddit?date=2022-04-03`


const ctx = document.getElementById('myChart');
const chartCanvas = ctx.getContext('2d');

// make chart with empty stuff 
const stockChart = new Chart(chartCanvas, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Closing Price',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

// turns a Date into 'YYYY-MM-DD'
function formatDate(dateObj) {
  const full = dateObj.toISOString();
  const parts = full.split('T');
  return parts[0];
}

// the big fetch function
async function stockGraph(ticker, range) {
  document.getElementById("chart").hidden = false
  ticker = ticker.toUpperCase();
  range = parseInt(range);
    
  const API_KEY = 'X_so89rIC5tlGibGUCa6bBrbAOHv9W2K';

  // get today
  const endDate = new Date();

  // get 90 days ago no matter what
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 90);

  // format dates for the URL
  const startStr = formatDate(startDate);
  const endStr = formatDate(endDate);

  // build the link 
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startStr}/${endStr}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.results || json.results.length === 0) {
      alert("SOMETHING BROKE");
      return;
    }

    // get only the last X results based on range
    const sliced = json.results.slice(-range);

    // make the label array (dates)
    const labels = [];
    for (let i = 0; i < sliced.length; i++) {
      const item = sliced[i];
      const dateObj = new Date(item.t);
      const prettyDate = dateObj.toLocaleDateString();
      labels.push(prettyDate);
    }

    // make the closing price array
    const prices = [];
    for (let i = 0; i < sliced.length; i++) {
      const item = sliced[i];
      prices.push(item.c);
    }

    // update the chart data
    stockChart.data.labels = labels;
    stockChart.data.datasets[0].data = prices;
    stockChart.data.datasets[0].label = `Closing Price for ${ticker} (${range} Days)`;
    stockChart.update();

  } catch (err) {
    console.log("Fetch exploded:", err);
    alert("SOMETHING BROKE");
  }
}

async function topFiveReditStock(tradeLink) {
    document.getElementById("stocksTable").innerHTML = ""
    try {
      const res = await fetch(tradeLink);
      const data = await res.json();
      const topFive = data.sort((a, b) => b.no_of_comments - a.no_of_comments).slice(0, 5);
  
      console.log(topFive);
  
      topFive.forEach(element => {
        let sent_img = document.getElementById("sentimentImg");
        if (element.sentiment == "Bullish") {
          sent_img = `https://cdn-icons-png.flaticon.com/512/14677/14677169.png`
        }else {
          sent_img = `https://cdn-icons-png.flaticon.com/512/14677/14677163.png`
        }
  
        document.getElementById("stocksTable").innerHTML += 
        `
        <tr>
          <th>
            <a href = "https://finance.yahoo.com/quote/${element.ticker}" target="_blank">${element.ticker}</a>
          </th>
          <td>${element.no_of_comments}</td>
          <td>
          ${element.sentiment}
          <img src="${sent_img}" id="sentimentImg">
          </td>
        </tr>
        `
      });
  
    } catch (err) {
      console.log(err)
    }
  }
  


topFiveReditStock(tradeLink);