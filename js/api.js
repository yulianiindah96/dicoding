const base_url = 'https://api.football-data.org/v2/';
const tokenAPI = 'b7fdf68820ce4d82bf06bfb3e6f13808';

const fetchAPI = (url) =>fetch(url,{
    headers:{
        'X-Auth-Token' : tokenAPI,
    },
})
.then(status)
.then(json)
.catch(error);

function status(response){
    if(response.status !== 200){
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}

function json(response){
    return response.json();
}

function error(error){
    console.log("Error : " + error);
}

function getArticles(){
   
    if('caches' in window){
        caches.match(`${base_url}teams/`).then((response)=>{
            if(response){
                response.json().then((data)=>{
                    showArticles(data);
                });
            }
        });
    }
 
    fetchAPI(`${base_url}teams/`)
    .then((data)=>{
        showArticles(data);
        console.log(data);
    })
    .catch(error);
    
}
function showArticles(data){
    let teamsHTML = "";
    data.teams.forEach((team)=>{
        console.log(team);
        teamsHTML +=`
      <div class="col s12 m6">
          <div class="card horizontal">
            <div class="card-image">
              <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <h3>${team.name}</h3>
                <a href="detail.html?id=${team.id}" class="btn waves-effect waves-light pulse activator">Lihat Pemain <i class="material-icons right">send</i></a>
              </div>
              <div class="card-action">
                <p>${team.area.name}</p>
              </div>
            </div>
          </div>
        </div>   
        `
    });
    document.getElementById("mobileTeams").innerHTML = teamsHTML;
}    


function getTeamDetails() {
 
    return new Promise(function(resolve, reject) {
        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");
 
        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`).then((response) => {
                if (response) {
                response.json()
                .then( (data) => {
                    showDetailTeams(data);
                    resolve(data);
                });
              }
            });
          }
 
        fetchAPI(`${base_url}teams/${idParam}`)
        .then( (data) => {
            showDetailTeams(data);
            resolve(data);
        });
    })
}

function showDetailTeams(data){
    console.log(data);
    let teamsHTML = ``;
    data.squad.forEach((team)=>{
        // console.log(team);
        teamsHTML +=`
        <tr>
            <td>${team.name}</td>
            <td>${team.position}</td>
            <td>${team.countryOfBirth}</td>
        </tr>
        `;
    });
    document.getElementById("content").innerHTML = teamsHTML;
}    


function getSavedTeams() {
    getAll().then(function (data) {
      console.log(data);
    //   Menyusun komponen card artikel secara dinamis
      var teamsHTML = "";
      data.forEach(function (team) {
        teamsHTML += `
        <div class="col s12 m6">
          <div class="card horizontal">
            <div class="card-image">
              <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <h3>${team.name}</h3>
                <a href="detail.html?id=${team.id}" class="btn waves-effect waves-light pulse activator">Lihat Pemain <i class="material-icons right">send</i></a>
              </div>
              <div class="card-action">
              <a class="btn-floating btn-large halfway-fab waves-effect waves-light red" onclick="deleteTeam(${team.id})">delete</a>
              </div>
            </div>
          </div>
        </div>   
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("content").innerHTML = teamsHTML;
    });
  }