//set up array of questions
$(document).ready(function () {
    var options = [
        {
            question: "Which team won the first Super Bowl", 
            choice: ["Packers", "Steelers", "Patriots", "49ers"],
            answer: 0,
         },
         {
            question: "Which coach was the Super Bowl trophy named for?", 
            choice: ["Pop Warner", "Tom Landry", "Vince Lombardi", "George S. Halas"],
            answer: 2,
         }, 
         {
             question: "Which team has won the most Super Bowls?", 
            choice: ["Cowboys", "Steelers", "Patriots", "49ers" ],
            answer: 1,
        }, 
        {
            question: "Which quarterback has the most Super Bowl rings?", 
            choice: ["Joe Montana", "Terry Bradshaw", "Tom Brady", "Troy Aikmenn" ],
            answer: 2,
        }, 
        {
            question: "Where was the first Super Bowl played?", 
            choice: ["Pasadena", "Miami", "Dallas", "Los Angeles" ],
            answer: 3,
        }, 
        {
            question: "The most watched Super Bowl had how many American viewers?", 
            choice: ["114 million", "200 million", "25 million", "33 million" ],
            answer: 0,
        }, 
        {
            question: "In 2018 a 30 second Super Bowl ad cost how much?", 
            choice: ["$500,000", "$1 million", "$2 million", "$5 million" ],
            answer: 3,
        }, 
        {
            question: "The first Super Bowl was known as:?", 
            choice: ["The Super Bowl", "The AFL-NFL World Championship Game", "The Pro Bowl" ],
            answer: 1,
        }];
    
    var correct = 0;
    var incorrect = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //set up on click event to hide button and display question
    $("#start").on("click", function () {
            $("#start").hide();
            showQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //function to start the timer, makes it decrease 1 second at a time (1000 miliseconds; must have boolean)
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //running the timer down
    function decrement() {
        $("#timer").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //if times up
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //the function to stop the timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomize questions/answers shown
    function showQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#question").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answer").append(userChoice);
   
    }
    
    
    
    //create on click event for when they select an answer
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //if else statements to tell computer what to do if they got it right or wrong
        if (userGuess === pick.answer) {
            stop();
            correct++;
            userGuess="";
            $("#answer").html("<p>Touchdown!</p>");
            hidepicture();
    
        } else {
            stop();
            incorrect++;
            userGuess="";
            $("#answer").html("<p>Flag! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answer").empty();
            timer= 20;
    
        //show results when all questions gone through
        if ((incorrect + correct + unanswerCount) === qCount) {
            $("#question").empty();
            $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answer").append("<h4> Correct: " + correct + "</h4>" );
            $("#answer").append("<h4> Incorrect: " + incorrect + "</h4>" );
            $("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correct = 0;
            incorrect = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            showQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        showQuestion();
    
    })
    
    })
