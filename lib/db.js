var dbPromised = idb.open("football", 1, function(upgradeDb){
    var articlesObjectStore = upgradeDb.createObjectStore("team",{
        keyPath : "id"
    });
    articlesObjectStore.createIndex("name","name",{unique:false});
});
//untuk menyimpan artikel
function saveForLater(team){
    dbPromised
    .then(function(db){
        var tx = db.transaction("team", "readwrite");
        var store = tx.objectStore("team");
        // console.log(article);
        store.put(team);
        return tx.complete; 
    })
    .then(function(){
        console.log("Artikel berhasil disimpan.");
    })
    

}
//mengambil seluruh data dari indexed db
function getAll(){
    return new Promise(function(resolve,reject){
        dbPromised
        .then(function(db){
            var tx = db.transaction("team","readonly");
            var store = tx.objectStore("team");
            return store.getAll();

        })
        .then(function(team){
            resolve(team);
        })
    })
}

function deleteTeam(team) {
    dbPromised
      .then((db) => {
        const tx = db.transaction('team', 'readwrite');
        const store = tx.objectStore('team');
        store.delete(team);
        return tx.complete;
      }).then(() => {
        M.toast({ html: 'Team has been deleted!' });
       
        getSavedTeams();
      }).catch((err) => {
        console.error('Error: ', err);
      });
  }