const dogInfo = [];


async function getDogImages() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await res.json(); 
    counter = 0;

    data.message.forEach(element => {

      if (counter++ == 0){
        document.getElementById("imgHolder").innerHTML +=
      `
      <div class="carousel-item active">
        <img src="${data.message[0]}" class="d-block w-25">
      </div>
      `
        return;
      }

      document.getElementById("imgHolder").innerHTML +=
      `
      <div class="carousel-item">
        <img src="${element}" class="d-block w-25">
      </div>
      `
    });
    

  } catch (err) {
    console.error('Error loading dog images:', err);
  }
}


async function getBreedInfo() {
  const res = await fetch('https://dogapi.dog/api/v2/breeds');
  const data = await res.json(); 

  data.data.forEach(dog => {
    dogInfo.push(dog);

    const dogName = dog.attributes.name;

    document.getElementById("dogBreeds").innerHTML += 
    `
    <button type="button" class="btn btn-primary" onclick="getDogInfo('${dogName.toLowerCase()}')"">${dogName}</button>
    `
  });

}


function getDogInfo(dogName){
  dogName = dogName.toLowerCase();
  document.getElementById("breedInfoSpot").innerHTML = 
  `
  <h2 id="dogInfoTitle">Breed Info</h2>
  `

  const selectedDog = dogInfo.find(dog => dog.attributes.name.toLowerCase() == dogName);
  let dogInfoName;
  let dogInfoDesc;
  let dogInfoMin;
  let dogInfoMax;


  if (selectedDog) {
    dogInfoName = selectedDog.attributes.name;
    dogInfoDesc = selectedDog.attributes.description;
    dogInfoMin = selectedDog.attributes.life.min;
    dogInfoMax = selectedDog.attributes.life.max;

    document.getElementById("breedInfoSpot").innerHTML = 
    `
    <h3 id="dogInfoTitle">Breed Info</h3>
            <h3 id="dogInfoName">Name: ${dogInfoName}</h3>
            <h3 id="dogInfoDesc">Description: ${dogInfoDesc}</h3>
            <h3 id="dogInfoMin">Min Life: ${dogInfoMin}</h3>
            <h3 id="dogInfoMax">Max Life: ${dogInfoMax}</h3>
    `
  } else {
      document.getElementById("breedInfoSpot").innerHTML = 
      `
      <h3 id="dogInfoTitle">Dog Not Found: ${dogName}</h3>
      `
      return;
  }
  
}


getDogImages();
getBreedInfo();
