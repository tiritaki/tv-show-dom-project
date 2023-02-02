//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const ul = document.getElementById("episodes-list");
  let option = "";

  for (const episode of episodeList) {
    let count = 0;
    //creating elements li,p,img,h3
    const li = document.createElement("li");
    li.classList.add("card");
    const name = document.createElement("h3");
    name.classList.add("name-of-episode");
    const img = document.createElement("img");
    const para = document.createElement("p");

    name.innerText = `${episode.name} - S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    img.src = episode.image.medium;
    para.innerHTML = episode.summary;

    li.appendChild(name);
    li.appendChild(img);
    li.appendChild(para);

    ul.appendChild(li);

    //select bar functionality
    option += `<option value = '${episode.name}'>S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}</option>`;
    document.getElementById("selector").innerHTML = option;
    const selectedEpisode = document.getElementById("selector");
    selectedEpisode.addEventListener('change', (event)=>{
      const val = event.target.value
      const isVisible = episode.name.includes(val);
      li.classList.toggle("hide", !isVisible);
    })
    

    //search bar functionality
    const searchInput = document.querySelector(".searchTerm");
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      const isVisible = episode.name.toLowerCase().includes(value) || episode.summary.toLowerCase().includes(value);
      li.classList.toggle("hide", !isVisible);
      const licard = document.querySelectorAll('.card')
      const hiddenCards = document.querySelectorAll('.hide')

      let arrayOfHiddenCards = Array.from(hiddenCards);
      let arrayOfCards = Array.from(licard);
      
      const rootElem = document.getElementById("display");
      rootElem.textContent = `Got ${arrayOfCards.length-arrayOfHiddenCards.length}/ ${episodeList.length} episode(s)`;
    });
    
    //episodes quantity display 
    
    const rootElem = document.getElementById("display");
    rootElem.textContent = `Got ${episodeList.length} / ${episodeList.length} episode(s)`;
  }
  
}
window.onload = setup;
