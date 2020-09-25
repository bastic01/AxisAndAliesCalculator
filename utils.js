function runSimulation(){
    // For now, just get the time and add it to the message so that we
    // can see it change with each button click.
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    document.getElementById('Output').textContent = time + ':  Now I just need to add some logic!' 
}