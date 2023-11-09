var timeOutInMsOnSuccessOrFailure = 2000;
$("#answer-button").click(function(){
    var answer = getUserInput();
    var correctAnswer = questionsAndAnswer[currentQuestionIndex].answer;
    if(answer == correctAnswer){
        $("[id *= input]").css("border", "3px solid green");
        if(currentQuestionIndex < questionsAndAnswer.length - 1){
            setTimeout(function(){
                $(".progress-bar").css("width", (currentQuestionIndex + 1) * ((1/questionsAndAnswer.length)*100) + "%" );
            currentQuestionIndex++;
            generateQuestion(currentQuestionIndex);
            generateInputs(currentQuestionIndex);
            }, timeOutInMsOnSuccessOrFailure);
        }else{
            setTimeout(function(){
                $(".progress-bar").css("width", "100%");
                showClue();
            }, timeOutInMsOnSuccessOrFailure);
        }
    }else{
        $("[id *= input]").css("border", "3px solid red");
        setTimeout(function(){
            $("[id *= input]").css("border", "1px solid #ced4da");
            $("[id *= input]").val("");
        }, timeOutInMsOnSuccessOrFailure);
    }
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
        innerHtml +=  "<input type='text' class='form-control' id='input"+i+"' value=''>";
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