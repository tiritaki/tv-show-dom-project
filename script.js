//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}


function makePageForEpisodes(episodeList) {

  const ul = document.getElementById("episodes-list");

  for (const episode of episodeList){
    //creating elements li,p,img,h3
    const li = document.createElement('li');
    li.classList.add('card')
    const name = document.createElement('h3');
    name.classList.add('name-of-episode')
    const img = document.createElement('img')
    const para = document.createElement('p');
    
    name.innerText = `${episode.name} - S${episode.season.toString().padStart(2, '0')}E${episode.number.toString().padStart(2, '0')}` 
    img.src = episode.image.medium
    para.innerHTML = episode.summary
    
    li.appendChild(name)
    li.appendChild(img)
    li.appendChild(para)

    ul.appendChild(li)

  const searchInput = document.querySelector('.searchTerm')
  searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase()
  
  const isVisible = episode.name.toLowerCase().includes(value) || episode.summary.toLowerCase().includes(value) 
    
  li.classList.toggle('hide', !isVisible)
  })

}
}
window.onload = setup;
