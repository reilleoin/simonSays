let num = -1;                                           // Show what color currently at
let userInput = [];                                   // User entry
let answer = [];                                // Pattern in order to continue the game
let simonSays = ["red","blue","green","yellow"]; 

let current = 0;                                        // Current score
let high = 0;                                           // High score

function nextPattern(){                                 // Level up, next sequence
    current++;                                          
    $("#currentScore").text(current);                   // Updating current score
    let rand = Math.floor(Math.random() * 4);           // Round up to whole numbers so it can be matched to simonSays array
    let color = simonSays[rand];                   // Pick random color
    answer.push(color);                         // Push random onto array answer
    repeatPattern();                                    // Repeat pattern for user to copy
}

function clickAnimation(id){                                // Creating white "flash" animation on buttonClick and repeating sequences for user
    // $(id).fadeOut(100).fadeIn(100);                      // Much prefer a normal fade, but to stick with guidelines I went white for a white flash
    let origin = $(id).css("background-color");             // Saving original background-color from id before changing to white and reverting
    $(id).css("background-color", "white");
    setTimeout(function(){
        $(id).css("background-color", origin);
    }, 250);
}


$(".button").click(function(buttonClicked){             // Checking users answer on which button id is clicked
    num++;
    let color = buttonClicked.target.id;
    clickAnimation("#" + color);
    checkAnswer(color);
});

function checkAnswer(color){                                        // Verifying click = 
    userInput.push(color);
    if(color == answer[num]){                               // Check if color pressed and actual color indicated is correct
        if(userInput.length == answer.length){            // Pattern lengths correspond to the level, once user achieves pattern length next level commences
            setTimeout(function(){
                userInput = [];                                       // Set user input array back to 0 to prepare for next level
                num = -1;
                nextPattern();                                          // Enter next level
            }, 1000);                                                   // Wait 1 second
        }
    }else{                                                              // INCORRECT colors chosen
        $(".signal-circle").css("background-color", "red");
        userInput = [];                                           // sets arrays to 0
        answer = [];   
        if(current > high)
        {
            high = current;                                         // Update highScore if beaten
            $("#highScore").text(current);    
        }
        current = 0;
        num = -1;
    }
}

$("#start").click(function(){                                               // Start the game, signal changes to green... starts after 5 seconds
    if(current <= 0){
        $(".signal-circle").css("background-color", "green");              
        setTimeout(function(){                                              
            nextPattern();
        }, 3000);
    }
});

function repeatPattern(){                                       // Repeat Pattern to user, increase speed on & after 5,9,13...
    if(current < 5){
    for(let i = 0; i < answer.length; i++){
        setTimeout(function(){
            clickAnimation("#" + answer[i]);
        }, 500 * i);                                        // Allow time for each animation to play after previous
    }
    }else if(current >= 5 && current < 9){
        for(let i = 0; i < answer.length; i++){
            setTimeout(function(){
                clickAnimation("#" + answer[i]);
            }, 400 * i); 
    }
    }else if(current >= 9 && current < 13){
        for(let i = 0; i < answer.length; i++){
            setTimeout(function(){
                clickAnimation("#" + answer[i]);
            }, 300 * i); 
    }
    } else if(current >= 13){
        for(let i = 0; i < answer.length; i++){
            setTimeout(function(){
                clickAnimation("#" + answer[i]);
            }, 200 * i); 
    }
    }
}




