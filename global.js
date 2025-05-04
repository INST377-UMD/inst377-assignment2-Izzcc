const micThing = document.getElementById("micThing")
const micOn  = 'https://cdn-icons-png.flaticon.com/128/25/25682.png';
const micOff = 'https://cdn-icons-png.flaticon.com/128/9258/9258220.png';

function startListening() {
  micThing.src = micOn;

  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World!'),
      'change the color to *backgroundColor': (backgroundColor) => {
        document.body.style.backgroundColor = backgroundColor;
      },
      'navigate to *page': (page) => {
        const p = page.toLowerCase();
        if (['home','stocks','dogs'].includes(p)) {
          window.location.href = `${p}.html`;
        }
      },
      'load dog breed *breed': (breed) => {
        getDogInfo(breed);
      },
      'look up *stock': (stock) => {
        console.log("Heard stock:", stock);
        let usrStock = stock.toUpperCase();
        document.getElementById("usrStock").value = usrStock;
        document.getElementById("dateRange").value = "30";
        stockGraph(usrStock, 30);
      }
    };

    annyang.removeCommands();
    annyang.addCommands(commands);
    annyang.start({ autoRestart: true, continuous: false });
  } else {
    alert("Annyang broke");
  }
}

  
  function stopListening() {
    micThing.src = micOff
    annyang.abort();
  }