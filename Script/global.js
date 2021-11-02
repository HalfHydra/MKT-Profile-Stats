var currentCup = 0;
var isDataEntered = false;
var values;
var itemData;
var coursenames;
var courseimages;

var startToggle = true;

var dataFieldsMade = false;

var courseListMade = false;

var disableDataUsage = false;

let savedata = {
    Items: {
        Drivers: {},
        Karts: {},
        Gliders: {}
    }
}

var characterid = [];
var charrarity = [];
var charitem = [];
var kartid = [];
var kartrarity = [];
var kartitem = [];
var gliderid = [];
var gliderrarity = [];
var glideritem = [];

let itemarray = [`00`,`01`,`02`,`03`,`04`,`05`,`06`,`07`,`10`,`11`,`12`,`13`,`14`,`15`,`16`,`17`,`22`,`23`,`24`,`26`,`27`,`31`,`32`,`33`,`44`,`45`,`47`,`48`,`49`,`50`,`51`,`52`,`55`,`57`,`58`,`99`];

let driverTable = [];
let machineTable = [];
let wingTable = [];

function generateArrays(){

    Object.keys(values).forEach(itemId => {
    if(itemId != 29 && itemId != 70057){
      if(itemId.toString().length < 5){
        driverTable.push(itemId);
      }
      if(itemId.toString().length == 5 && Math.round(itemId / 1000) == 30){
        wingTable.push(itemId);
      }
      if(itemId.toString().length == 5 && Math.round(itemId / 1000) == 70){
        machineTable.push(itemId);
      }
    }

    }); 

    let sortIdArray = [];

    driverTable.forEach((id, i) => {
        let anObject = {};
        anObject.sort = values[id].sortId;
        anObject.partId = id;
        anObject.rarity = values[id].rarityId + 1;
        anObject.item = values[id].itemTypeId;
        sortIdArray.push(anObject);
        //console.log(id);
    });
    sortIdArray.sort((a, b) => (a.sort > b.sort) ? 1 : -1);
    sortIdArray.forEach(it => {
        characterid.push(it.partId);
        charrarity.push(it.rarity.toString());
        charitem.push(it.item);
    });

    sortIdArray = [];
    machineTable.forEach((id, i) => {
        let anObject = {};
        anObject.sort = values[id].sortId;
        anObject.partId = id;
        anObject.rarity = values[id].rarityId + 1;
        anObject.item = values[id].itemTypeId;
        sortIdArray.push(anObject);
        //console.log(id);
    });
    sortIdArray.sort((a, b) => (a.sort > b.sort) ? 1 : -1);
    sortIdArray.forEach(it => {
        kartid.push(it.partId);
        kartrarity.push(it.rarity.toString());
        kartitem.push(it.item);
    });

    sortIdArray = [];
    wingTable.forEach((id, i) => {
        let anObject = {};
        anObject.sort = values[id].sortId;
        anObject.partId = id;
        anObject.rarity = values[id].rarityId + 1;
        anObject.item = values[id].itemTypeId;
        sortIdArray.push(anObject);
        //console.log(id);
    });
    sortIdArray.sort((a, b) => (a.sort > b.sort) ? 1 : -1);
    sortIdArray.forEach(it => {
        gliderid.push(it.partId);
        gliderrarity.push(it.rarity.toString());
        glideritem.push(it.item);
    });

}

// window.onclick = function(event) {
//   if (event.target == inventorymodal) {
//     inventorymodal.style.display = "none";
//     document.getElementById('singleinv').innerHTML = "";
//   }
// }

function updatesavedata() {
    generateCourseList();
    document.getElementById('json').innerHTML = JSON.stringify(savedata, null, 2);
}

function updateLocalSaveData(){
    localStorage.setItem("MKTVSaveData",JSON.stringify(savedata, null, 2));
}

function deleteLocalSaveData(){
    localStorage.removeItem("MKTVSaveData");
    localStorage.removeItem("MKTVSettingData");
    alert('Deleted Save File. This option is VERY unstable and may require you to clear your browser cache or restart your browser to function properly.')
}

function downloadcoursejson(mode){
    generateCourseList();
    courseListMade = true;
    var data = "";
    switch(mode){
    case 0:
    data = JSON.stringify(coursedata, null, 2);
    break;
    case 1:
    data = JSON.stringify(coursedataeng, null, 2);
    break;
    case 2:
    data = JSON.stringify(values, null, 2);
    break;
    }
    var filename = "";
    switch(mode){
        case 0:
        filename = "MKTCoursesIDs" + currentTourFileName + ".json";
        break;
        case 1:
        filename = "MKTCoursesNames" + currentTourFileName + ".json";
        break;
        case 2:
        filename = "MKTValuesList" + currentTourFileName + ".json";
        break;
    }
    var type = "text";
    var a = document.createElement("a")
      , file = new Blob([data],{
        type: type
    });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function switchTab(tab){
    switch(tab){
        case 0:
            document.getElementById('').style.display = block;
            break;
        case 1:
            document.getElementById('').style.display = block;
            break;
        case 2:
            document.getElementById('').style.display = block;
            break;
        case 3:
            document.getElementById('').style.display = block;
            break;
        case 4:
            document.getElementById('').style.display = block;
            break;
        case 5:
            document.getElementById('').style.display = block;
            break;
    }
}