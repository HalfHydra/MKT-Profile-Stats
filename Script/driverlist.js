function generateDriverList(){

    let output = document.getElementById('drivers');

    Object.keys(savedata.Drivers).forEach((t,i)=>{
        let driverDiv = document.createElement('div');
        driverDiv.id = `driver_${t}`;
        driverDiv.class = "driverDiv";
        output.appendChild(driverDiv);


    })
}