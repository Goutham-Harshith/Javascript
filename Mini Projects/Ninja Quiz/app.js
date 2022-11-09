const form = document.querySelector('.quiz-form');
const result =  document.querySelector(".result");

let score =  0;
let currectAnswers = ['B','B','B','B'];

$(document).ready(function(){
    $('.toast').toast('show');
  });

form.addEventListener('submit', (e)=>
{
    e.preventDefault();
    score = 0;
    let output = 0;
    result.classList.remove('d-none');
    let percentage = result.querySelector('span')
    let answers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    answers.forEach((answer, i)=>
    {
        if(answer == currectAnswers[i])
        {
            score += 25;
        }
    })


    if(score == 100)
    {
        let toast = document.querySelector(".toast");
        toast.classList.remove('d-none');
        $('.toast').toast('show');
    }

    scrollTo({top: 0, behavior: "smooth"});

   setInterval(()=>
    {
        if(score >= output){
            percentage.textContent = `${output}%`
            output++;
        }
        else
        {
            clearInterval();
        }
    }, 10)

})
