function runSimulation(){
    //Adding in some initial logic.  The style here is intentionally simplistic and verbose.  We'll refine as we learn new concepts.
    
    //For now, assuming allies are attacking :)

    //Figure out how many allies and axis infantry troops are fighting by getting the values entered.
    let origNumAxisInfantry = document.getElementById('AxisInfantryTextBox').value;
    let origNumAlliedInfantry = document.getElementById('AlliedInfantryTextBox').value;
    console.log('Allies: ' + origNumAlliedInfantry + ' Axis: ' + origNumAxisInfantry );

    //as we get hits, the number of each army will diminish.  Set up to variables that track
    // that reduced army, and start them off at full strength.
    let remainingNumAxisInfantry = origNumAxisInfantry;
    let remainingNumAlliedInfantry = origNumAlliedInfantry;

    
    console.log('about to start')
    //I want to track a few things across rounds.  Here are a few variables to do that.
    let counter = 1;    
    let numOnes = 0;
    let numTwos = 0;
    let numThrees = 0;
    let numFours = 0;
    let numFives = 0;
    let numSixes = 0;

    //Loop until someone is out of troops.
    while(remainingNumAxisInfantry > 0 && remainingNumAlliedInfantry > 0)
    {
        console.log('Round ' + counter)

        //Let the allies roll.
        let alliedHits = 0;
        console.log(' Allies will roll ' + remainingNumAlliedInfantry + ' times')
        for(let i=0;i<remainingNumAlliedInfantry;i++)
        {
            let result = rollDie();
            numOnes = result === 1 ? numOnes+1 : numOnes;
            numTwos = result === 2 ? numTwos+1 : numTwos;
            numThrees = result === 3 ? numThrees+1 : numThrees;
            numFours = result === 4 ? numFours+1 : numFours;
            numFives = result === 5 ? numFives+1 : numFives;
            numSixes = result === 6 ? numSixes+1 : numSixes;

            console.log('   Allies roll ' + (i+1) + ': ' + result)
            if(result <= 1)
            {
                alliedHits++
                console.log('   Hit!')
            }
        }
        console.log('  Allied hits: ' + alliedHits)

        //Let the axis roll.
        let axisHits = 0;
        console.log(' Axis will roll ' + remainingNumAxisInfantry + ' times')
        for(let i=0;i<remainingNumAxisInfantry;i++)
        {
            let result = rollDie();
            numOnes = result === 1 ? numOnes+1 : numOnes;
            numTwos = result === 2 ? numTwos+1 : numTwos;
            numThrees = result === 3 ? numThrees+1 : numThrees;
            numFours = result === 4 ? numFours+1 : numFours;
            numFives = result === 5 ? numFives+1 : numFives;
            numSixes = result === 6 ? numSixes+1 : numSixes;
            console.log('   Axis roll ' + (i+1) + ': ' + result)
            if(result <= 2)
            {
                axisHits++
                console.log('   Hit!')
            }
        }
        console.log('  Axis hits: ' + axisHits)

        //Figure out who to kill.  Since we just have infantry right now, just kill infantry.
        remainingNumAlliedInfantry = remainingNumAlliedInfantry - axisHits;
        remainingNumAxisInfantry = remainingNumAxisInfantry - alliedHits;
    
        console.log("  Allies Remaining: " + remainingNumAlliedInfantry);
        console.log("  Axis Remaining: " + remainingNumAxisInfantry);

        counter++;
    }
    
    //Figure out who won....
    let winnerMsg = '';
    if(remainingNumAlliedInfantry <= 0 && remainingNumAxisInfantry <= 0)
    {
        winnerMsg = 'Tie';
    }else if(remainingNumAlliedInfantry > 0 && remainingNumAxisInfantry <= 0)
    {
        winnerMsg = 'Allies Win!';
    }else if(remainingNumAlliedInfantry <= 0 && remainingNumAxisInfantry > 0)
    {
        winnerMsg = 'Axis Win!';
    }else{
        winnerMsg = 'Battle not over...how did we get here?';
    }

    //Write out how many times each value was rolled
    console.log('Total Number of times 1 rolled: ' + numOnes);
    console.log('Total Number of times 2 rolled: ' + numTwos);
    console.log('Total Number of times 3 rolled: ' + numThrees);
    console.log('Total Number of times 4 rolled: ' + numFours);
    console.log('Total Number of times 5 rolled: ' + numFives);
    console.log('Total Number of times 6 rolled: ' + numSixes);

    //Show who won!
    document.getElementById('Output').textContent = remainingNumAlliedInfantry.toString() + ' ' + remainingNumAxisInfantry.toString() + ':  ' + winnerMsg;
    
}

//Simple function to simulate a six sided die roll
function rollDie(){
    //See here for explanation: https://dev.to/rocambille/how-to-roll-a-dice-in-javascript-51j0
    return Math.floor(Math.random() * 6) + 1;
}