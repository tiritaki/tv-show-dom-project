function setup() {
  let showId = '';
  const allShows = getAllShows();
  let opt = "";
  for (let show of allShows){
    opt += `<option value = '${show.id}'>${show.name}</option>`;
    document.getElementById("selector-show").innerHTML = opt;
  }
  const selectedShow = document.getElementById("selector-show");
  selectedShow.addEventListener('change', (event)=>{
    const val = event.target.value
    showId = val.toString()
      // allEpisodes fetch
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      // allEpisodes = data
      makePageForEpisodes(data);
    })
  })
}

function makePageForEpisodes(episodeList) {
  const ul = document.getElementById("episodes-list");
  ul.innerHTML = '';
  let option = "";

  //episodes quantity display 
  const rootElem = document.getElementById("display");
  rootElem.textContent = `Got ${episodeList.length} / ${episodeList.length} episode(s)`;

  for (const episode of episodeList) {
    //creating elements li,p,img,h3
    const li = document.createElement("li");
    li.classList.add("card");
    const name = document.createElement("h3");
    name.classList.add("name-of-episode");
    const img = document.createElement("img");
    const para = document.createElement("p");

    name.innerText = `${episode.name} - S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    img.src = episode.image.medium;
    para.innerHTML = episode.summary;

    li.appendChild(name);
    li.appendChild(img);
    li.appendChild(para);
    ul.appendChild(li);

    //select episode bar functionality
    option += `<option value = '${episode.name}'>S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}</option>`;
    document.getElementById("selector-episode").innerHTML = option;
    const selectedEpisode = document.getElementById("selector-episode");
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
      
      //episodes quantity display 
      const hiddenCards = document.querySelectorAll('.hide')
      let arrayOfHiddenCards = Array.from(hiddenCards);
      const rootElem = document.getElementById("display");
      rootElem.textContent = `Got ${episodeList.length-arrayOfHiddenCards.length} / ${episodeList.length} episode(s)`;
    });
  }
}
window.onload = setup;

