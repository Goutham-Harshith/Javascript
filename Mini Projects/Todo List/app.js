let ul =  document.querySelector('.todos');
let addTodosForm = document.querySelector('.add');
let searchFrom =  document.querySelector('.search');


// Add Todos
addTodosForm.addEventListener('submit', (event)=>
{
    event.preventDefault();
    if(addTodosForm.add.value.trim().length)
    {
        let li =  createNewTodo( addTodosForm.add.value.trim() );
        ul.innerHTML += li;
        addTodosForm.reset();
        searchFrom.reset();
    }
})

const createNewTodo = (todo)=>
{
    let html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
     <span> ${todo} </span>
     <i class="far fa-trash-alt delete"></i>
     </li>
    `
    return html;
}

//Delete Todos
ul.addEventListener('click', (e)=>
{
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
    }
})


//Filter Todos
searchFrom.search.addEventListener('keyup', (e)=>
{
    let searchString = searchFrom.search.value.trim().toLowerCase();
    filterValues(searchString);
})

const filterValues = (value) =>
{
    let todoList =  Array.from(ul.children);
    todoList
    .filter(element=> !element.textContent.includes(value))
    .forEach(element => {
        element.classList.add('display-none')
    })
   
    todoList
    .filter(element=> element.textContent.includes(value))
    .forEach(element => {
        element.classList.remove('display-none')
    })

}