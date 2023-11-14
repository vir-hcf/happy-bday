var timeOutInMsOnSuccessOrFailure = 2000;
var timeoutForNextQuestion = 11000;
var typed;
$("#answer-button").click(function(){
    var answer = getUserInput();
    var correctAnswer = questionsAndAnswer[currentQuestionIndex].answer;
    if(answer == correctAnswer){
        $("[id *= input]").css("border", "3px solid green");
        questionsAndAnswer[currentQuestionIndex].wrongAttemptCount = 0;
        appreciate();
        handleNextQuestion();   
    }else{
        $("[id *= input]").css("border", "3px solid red");
        if(questionsAndAnswer[currentQuestionIndex].wrongAttemptCount < 5)
            questionsAndAnswer[currentQuestionIndex].wrongAttemptCount++;
        
        if(questionsAndAnswer[currentQuestionIndex].wrongAttemptCount == 5){
            showHint(questionsAndAnswer[currentQuestionIndex].hint);
        }
        setTimeout(function(){
            $("[id *= input]").css("border", "1px solid #ced4da");
            $("[id *= input]").val("");
            $("[id *= input]")[0].focus();
        }, timeOutInMsOnSuccessOrFailure);
    }
});
$("#next-button").click(function(){
    nextQuestionClick();
    $(this).hide();
});

function getUserInput(){
    var answer = "";
    $("[id *= input]").each(function(){
        answer += $(this).val();
    });
    console.log(answer);
    return answer.toLowerCase();
}
function generateQuestion(index){
    $(document).scrollTop(0);
    var question = questionsAndAnswer[index].question;
    $(".question").html(question);
}
function generateInputs(index){
    var noOfInputs = questionsAndAnswer[index].answer.length;
    var innerHtml = "";
    $(".inputs").html("");
    for(let i=0;i<noOfInputs;i++){
        innerHtml +=  "<input type='text' maxlength='1' class='form-control' id='input"+i+"' value=''>";
    }
    $(".inputs").html(innerHtml);
    $("[id *= input]").keyup(function(){
        if($(this).val().length == 1){
            $(this).next().focus();
        }
    });
}
function showClue() {
    $(".question-container").hide();
    $(".clue-container").fadeIn(3000);
    $(".progress-bar").html("Great Job! Anju");
}
function showHint(hint) {
    $(".hint-container").fadeIn(3000);
    $(".hint-container #hint").html(hint);
}
function appreciate() {
    $(".appreciation-container").show();
    var appreciation = appreciationTokens[currentQuestionIndex];
    typed = new Typed('.appreciation-container .alert span.message', {
        strings: [appreciation],
        typeSpeed: 50,
      });
}
function handleNextQuestion(){
    if(currentQuestionIndex < questionsAndAnswer.length - 1){
        $(".progress-bar").css("width", (currentQuestionIndex + 1) * ((1/questionsAndAnswer.length)*100) + "%" );
        $("#next-button").show(); 
    }else{
        setTimeout(function(){
            $(".progress-bar").css("width", "100%");
            showClue();
        }, timeoutForNextQuestion);
    }
}
function nextQuestionClick() {
    currentQuestionIndex++;
    generateQuestion(currentQuestionIndex);
    generateInputs(currentQuestionIndex);
    $(".appreciation-container").hide();
    $(".appreciation-container .alert span.message").html("");
    if($("#collapseExample").hasClass("show"))
        $(".hint-container button").click();
    $(".hint-container").hide();
    typed.destroy();
}

