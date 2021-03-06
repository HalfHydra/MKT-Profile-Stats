function generateNavBarGlider(){
    let output = document.getElementById('gliders');

    let header = document.createElement('div');
    header.className = "header";
    output.appendChild(header); 

    let descendDR = document.createElement('img');
    descendDR.src = "./Images/UI/Header/DateReceivedD.png";
    descendDR.className = "headerBtn";
    descendDR.addEventListener('click', function () {
        generateGliderList(0);
    });
    header.appendChild(descendDR);

    let ascendDR = document.createElement('img');
    ascendDR.src = "./Images/UI/Header/DateReceivedA.png";
    ascendDR.className = "headerBtn";
    ascendDR.addEventListener('click', function () {
        generateGliderList(1);
    });
    header.appendChild(ascendDR);

    let inGame = document.createElement('img');
    inGame.src = "./Images/UI/Header/InGame.png";
    inGame.className = "headerBtn";
    inGame.addEventListener('click', function () {
        generateGliderList(2);
    });
    header.appendChild(inGame);

    let returnTop = document.createElement('img');
    returnTop.src = "./Images/UI/Header/ReturnToTop.png";
    returnTop.className = "returnTop";
    returnTop.addEventListener('click', function () {
        ReturnToTop();
    });
    header.appendChild(returnTop);

    let backBtn = document.createElement('img');
    backBtn.src = "./Images/UI/Header/Back.png";
    backBtn.className = "backBtn";
    backBtn.addEventListener('click', function () {
        switchTab(0);
    });
    header.appendChild(backBtn);
}

function generateGliderList(type){

    let output = document.getElementById('gliders');
    output.innerHTML = "";

    generateNavBarGlider();

    let items = [];

    switch(type){
        case 0:
            items = Object.keys(savedata.Gliders);
            break;
        case 1:
            items = Object.keys(savedata.Gliders);
            items.reverse();
            break;
        case 2:
            items = Object.keys(savedata.Gliders);
            items.sort(function (a, b) {
                return values[`${savedata.Gliders[a].id}`].sortId - values[`${savedata.Gliders[b].id}`].sortId;
            });
            break;
    }


    items.forEach((t,i)=>{
        let driverDiv = document.createElement('div');
        driverDiv.id = `glider_${t}`;
        driverDiv.className = "driverDiv";
        output.appendChild(driverDiv);

        //generateFaceEntry
        let faceEntry = document.createElement('img');
        faceEntry.className = "faceEntry";
        switch(values[savedata.Gliders[t].id].rarityId){
            case 0:
                faceEntry.style.backgroundImage = `url('./Images/UI/Background/kgnormal.png')`
                break;
            case 1:
                faceEntry.style.backgroundImage = `url('./Images/UI/Background/kgrare.png')`
                break;
            case 2:
                faceEntry.style.backgroundImage = `url('./Images/UI/Background/kghighend.png')`
                break;
        }
        faceEntry.src = `https://halfhydra.github.io/MarioKartTourValues/Images/Wing/${values[savedata.Gliders[t].id].nameInternal}_Large.png`;
        faceEntry.loading = "lazy";
        driverDiv.appendChild(faceEntry);

        let driverTextDiv = document.createElement('div');
        driverTextDiv.className = "driverTextDiv";
        driverDiv.appendChild(driverTextDiv);

        //generateName
        let driverName = document.createElement('p');
        driverName.className = "driverName";
        driverName.innerHTML = `${values[savedata.Gliders[t].id].nameEng}`;
        driverTextDiv.appendChild(driverName);

        //generateDateReceived
        let driverReceived = document.createElement('p');
        driverReceived.className = "driverReceived";
        //console.log(savedata.Gliders[t].received_epoch);
        driverReceived.innerHTML = `Received: ${new Date(savedata.Gliders[t].received_epoch * 1000).toLocaleString()}`;
        driverTextDiv.appendChild(driverReceived);

        //boxPoints
        driverDiv.appendChild(generatePointsBox(0, savedata.Gliders[t].basepoints, savedata.Gliders[t].basepointsprogress, savedata.Gliders[t].pointCapLevel, values[savedata.Gliders[t].id].rarityId,t));

        //boxLevel
        driverDiv.appendChild(generateLevelBox(0,savedata.Gliders[t].level,0,t));

        //boxCap
        driverDiv.appendChild(generateCapLevel(0,values[savedata.Gliders[t].id].rarityId,savedata.Gliders[t].pointCapLevel));
    })

function generatePointsBox(itemType, points, progress, capLevel, rarity, index){
    let boxPoints = document.createElement('div')
    boxPoints.className = "boxPoints";
    if(points == 700 && rarity == 2 || points == 450 && rarity == 1 || points == 380 && rarity == 0){
        boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverMax.png)";
    } else {
        boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverProgress.png)";
    }

    switch(rarity){
        case 0:
            if(points == 300 && capLevel < 1){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 324 && capLevel < 2){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 352 && capLevel < 3){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            break;
        case 1:
            if(points == 330 && capLevel < 1){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 366 && capLevel < 2){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 408 && capLevel < 3){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            break;
        case 2:
            if(points == 400 && capLevel < 1){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 490 && capLevel < 2){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            if(points == 595 && capLevel < 3){
                boxPoints.style.backgroundImage = "url(./Images/UI/Lists/DriverLocked.png)";
            }
            break;
    }

    let pointsCount = document.createElement('div');
    pointsCount.id = `pointsCount_${points}`;
    pointsCount.className = "pointsContainer";

    var charoutput = [];
    for (var i = 0; i < points.toLocaleString().length; i++) {
        charoutput.push(points.toLocaleString().charAt(i));
    }
    charoutput.forEach((t,i)=>{
      var number = document.createElement('img');
      number.className = `scoreNumber`;
      if(t == ","){
        number.className = `scoreComma`;
      }
      number.src = `./Images/UI/Number/${t}.png`
      pointsCount.appendChild(number);
    });
    boxPoints.appendChild(pointsCount);

    let converted = calcPoints(savedata.Gliders[`${index}`].total_xp, rarity, 0);
    //console.log(converted)

    if(boxPoints.style.backgroundImage.includes('DriverProgress')){
            let listlevelpanel = document.createElement('div');
            listlevelpanel.id = `listpointpanel`
            listlevelpanel.className = `listpointpanel`;
            boxPoints.appendChild(listlevelpanel);
        
            var listlevelprogress = document.createElement('progress');
            listlevelprogress.id = `listpointprogress`
            listlevelprogress.className = 'listpointprogress';
            listlevelprogress.src = "./Images/UI/specificitem1.png";
            listlevelprogress.value = savedata.Gliders[`${index}`].basepointsprogress;
            listlevelprogress.max = savedata.Gliders[`${index}`].basepointsrangetotal;
            listlevelpanel.appendChild(listlevelprogress);
                    
            let listlevelprogresstext = document.createElement('p');
            listlevelprogresstext.id = `listpointprogresstext`
            listlevelprogresstext.className = `listpointprogresstext`;
            listlevelprogresstext.innerHTML = `${savedata.Gliders[`${index}`].basepointsprogress} / ${savedata.Gliders[`${index}`].basepointsrangetotal}`;
            listlevelpanel.appendChild(listlevelprogresstext);
    }
    return boxPoints;
}

function generateLevelBox(itemType, level, progress, index){
    let boxLevel = document.createElement('div')
    boxLevel.className = "boxLevel";
    if(level == 8){
        boxLevel.style.backgroundImage = "url(./Images/UI/Lists/DriverLevelMaxed.png)";
    } else {
        boxLevel.style.backgroundImage = "url(./Images/UI/Lists/DriverLevelProgress.png)";
    }

    var number = document.createElement('img');
    number.className = `levelNumber`;
    number.src = `./Images/UI/LevelNumber/${level}.png`
    boxLevel.appendChild(number);

    let converted = convertToLevel(savedata.Gliders[`${index}`].totalCount, values[`${savedata.Gliders[`${index}`].id}`].rarityId);
    //console.log(converted)

    if(level != 8){
    let listlevelpanel = document.createElement('div');
    listlevelpanel.id = `listlevelpanel`
    listlevelpanel.className = `listlevelpanel`;
    boxLevel.appendChild(listlevelpanel);

    var listlevelprogress = document.createElement('progress');
    listlevelprogress.id = `listlevelprogress`
    listlevelprogress.className = 'listlevelprogress';
    listlevelprogress.src = "./Images/UI/specificitem1.png";
    listlevelprogress.value = converted[1];
    listlevelprogress.max = converted[2];
    listlevelpanel.appendChild(listlevelprogress);
            
    let listlevelprogresstext = document.createElement('p');
    listlevelprogresstext.id = `listlevelprogresstext`
    listlevelprogresstext.className = `listlevelprogresstext`;
    listlevelprogresstext.innerHTML = `${converted[1]} / ${converted[2]}`;
    listlevelpanel.appendChild(listlevelprogresstext);
    }
    return boxLevel;
}

function generateCapLevel(itemType, rarity, level){
    switch(level) {
        case 2:
            level = 6;
            break;
        case 3:
            level = 16;
            break;
    }

    let boxCap = document.createElement('div');
    boxCap.className = "boxCap";

    let ticketImg = document.createElement('img')
    ticketImg.className = "ticketImg"
    switch(rarity){
        case 0:
            ticketImg.src = "./Images/UI/Tickets/TicketScoreUpUnlock_Driver_Normal.png"
            break;
        case 1:
            ticketImg.src = "./Images/UI/Tickets/TicketScoreUpUnlock_Driver_Rare.png"
            break;
        case 2:
            ticketImg.src = "./Images/UI/Tickets/TicketScoreUpUnlock_Driver_Ultra.png"
            break;
    }
    boxCap.appendChild(ticketImg);

    let capNum = document.createElement('p');
    capNum.innerHTML = `x${level}`;
    capNum.className = "capNum";
    boxCap.appendChild(capNum);
    return boxCap;
}

}