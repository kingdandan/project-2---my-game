const start_buttom = document.getElementById('start_btn');
const next_buttom = document.getElementById('next_btn');
const question_container_element = document.getElementById('question-conteiner');
const question_element = document.getElementById('question');
const answer_buttons_element = document.getElementById('answer_buttons');
const money_disply = document.getElementById('cash_display');
const finish_the_game = document.getElementById('finish_game');
const a1=document.getElementById('a1');
const a2=document.getElementById('a2');
const a3=document.getElementById('a3');
const a4=document.getElementById('a4');
let shuffle_questions , current_question_index ,money_counter=0 ,question_counter=0 ;

document.addEventListener('DOMContentLoaded', () =>{
    const gameContainer = document.getElementById("game_container");
    original_container_color = getComputedStyle(gameContainer).backgroundColor;
});


start_buttom.addEventListener('click', start_playing)
next_buttom.addEventListener('click' ,()=>{
    current_question_index++;
    the_next_question();
})

function start_playing()
{
    reset_answer_button_colors()
    // answer_buttons_element.style.backgroundColor= 'natural';
    start_buttom.classList.add('hide');
    money_disply.classList.remove('hide');
    money_disply.textContent = `total cash :${money_counter}` ;
    finish_the_game.classList.add('hide');
    money_counter=0;
    shuffle_questions = question_list.sort(()=>Math.random() - 0.5); //Gives us a numver - "0" or "1" , then you subtract 0.5 from it , then if the outcome is  negitive number - it will be sorted in one way , and if it's a positive number - it will be sorted in a different way.
    current_question_index = 0;
    question_container_element.classList.remove('hide');
    the_next_question();
}

function the_next_question()
{
   show_question(shuffle_questions[current_question_index])
}

function show_question(question)
{
    reset_answer_button_colors()
    reset_container_color()
    question_element.innerText = question.question;
    a1.innerText=question.answers[0].text;
    a2.innerText=question.answers[1].text;
    a3.innerText=question.answers[2].text;
    a4.innerText=question.answers[3].text;
    // for(let i=0;i<question.answers.length;i++)
    // {
    //     document.getElementById('a'+i).innerText=question.answers[i].text;
    // }
    next_buttom.classList.add('hide');
  
}

window.onload=()=>{
    answer_buttons_element.addEventListener('click',(event)=>
         {
             disable_answers_buttons();
                 let array={};
                 let i=0 ,j=0;
                 let index=0;
                 const selected_button = event.target.innerText;
                     for( i=0;i<4;i++)
                     {
                         array[i]=shuffle_questions[current_question_index].answers[i];
 
                     }
                     for(i=0;i<4;i++)
                     {
                         if(selected_button !== array[i].text)
                         {
                         j++; 
                         }
                         else{
                             index=i;
                             break;
                         }
                     }
 
                     if(array[index].correct)
                     {
                         event.target.style.backgroundColor = 'green';
                         money_counter += 1000;
                         question_counter++;
                         money_disply.textContent = `total cash :${money_counter}` ;
                         if(question_counter === 6)
                         {
                             question_container_element.classList.add('hide')
                             next_buttom.classList.add('hide');
                             let element = document.getElementById("game_container");
                             element.style.backgroundColor= "green" ;
                             let msg = document.createElement('div')
                             msg.textContent = `Congradulations !!! You won the game !!!` ;
                             money_counter = 0;
                             question_counter=0;
                             element.appendChild(msg) 
                             setTimeout(()=> {
 
                               start_buttom.classList.remove('hide');
                               finish_the_game.classList.remove('hide');
                               element.removeChild(msg)
                               reset_container_color()
                                  }, 3000);  
                         }
                         else
                         {
                         next_buttom.classList.remove('hide');
                         }
                     }
                     else 
                     {
                             event.target.style.backgroundColor = 'red';
                             
                                 if(array[0].correct)
                                 {
                                     a1.style.backgroundColor = 'green'; 
                                 }
                                 if(array[1].correct)
                                 {
                                     a2.style.backgroundColor = 'green'; 
                                 }
                                 if(array[2].correct)
                                 {
                                     a3.style.backgroundColor = 'green'; 
                                 }
                                 if(array[3].correct)
                                 {
                                     a4.style.backgroundColor = 'green'; 
                                 }
 
                             
                             
                             setTimeout(()=> {game_over()}, 3000);
                     
                 }
             
 
         });
 }
 function disable_answers_buttons()
 {
     a1.disabled = true;
     a2.disabled = true;
     a3.disabled = true;
     a4.disabled = true;
 }
 function ebable_answers_buttons()
 {
     a1.disabled = false;
     a2.disabled = false;
     a3.disabled = false;
     a4.disabled = false;
 }

function game_over()
{
    money_disply.classList.add('hide');
    question_container_element.classList.add('hide')
    let element = document.getElementById("game_container");
    element.style.backgroundColor= "red" ;
    let msg = document.createElement('div')
    msg.textContent = `Game over! your score is :${money_counter}` ;
    money_counter = 0;
    question_counter=0;
    element.appendChild(msg) 
    setTimeout(()=> {

        start_buttom.classList.remove('hide');
        finish_the_game.classList.remove('hide');
        element.removeChild(msg)
        reset_container_color()
         }, 3000);  
}

function reset_answer_button_colors() {
    ebable_answers_buttons();
    const answerButtons = document.querySelectorAll('.answers');
    answerButtons.forEach(button => {
        button.style.backgroundColor = 'hsl(var(--hue-natural), 100%, 50%)';
    });
}

function reset_container_color() {
    const gameContainer = document.getElementById("game_container");
    gameContainer.style.backgroundColor = original_container_color; // Apply the original color
}


const question_list = [
    {
        question: 'What is the capital city of Israel ?' ,
        answers : [
            { text:'Jerusalem' , correct : true } ,
            {text:'Haifa' , correct: false},
            {text:'Tel Aviv' , correct: false},
            {text:'Ashdod' , correct: false} 
        ]} ,
    {question: 'Who was the first Israeli Prime-Minister ?' ,
        answers : [
            { text:'Binyamin Netanyahu' , correct : false } ,
            {text:'David Ben-Guryon' , correct: true},
            {text:'Shimon Peres' , correct: false},
            {text:'Yitzhak Rabin' , correct: false} 
        ]} ,
        {question: 'where is Eilat city  ?' ,
        answers : [
            { text:'North' , correct : false } ,
            {text:'East' , correct: false},
            {text:'South' , correct: true},
            {text:'West' , correct: false} 
        ]} ,
        {question: 'Who was Moses brother  ?' ,
        answers : [
            { text:'King David' , correct : false } ,
            {text:'Yonatan' , correct: false},
            {text:'Jacob' , correct: false},
            {text:'Aharon HaCohen' , correct: true} 
        ]} ,
        {question: 'Where will we send Sinuar ?' ,
        answers : [
            { text:'To the Luna Park' , correct : false } ,
            {text:'To Hell' , correct: true},
            {text:'To learn Java Screept' , correct: false},
            {text:'To Qatar' , correct: false} 
        ]} ,
        {question: 'What is the USAs nickname ?' ,
        answers : [
            { text:'Uncle Sam' , correct : true } ,
            {text:'Uncle Joe' , correct: false},
            {text:'Captain America' , correct: false},
            {text:'The white Eagle' , correct: false} 
        ] 
    }
];

