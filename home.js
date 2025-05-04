const quoteAPI = 'https://zenquotes.io/api/quotes/';

async function generateQuote(api) {
    try {
      const res  = await fetch(api);
      const data = await res.json();
      const idx  = Math.floor(Math.random() * data.length);
      document.getElementById('randomQuote').textContent =
        `${data[idx].q} — ${data[idx].a}`;
    } catch (err) {
      console.error(err);
      document.getElementById('randomQuote').innerHTML =
        'could not load quote :(';
    }
  }

generateQuote(quoteAPI);

  