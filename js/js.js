
$(document).ready (function($) {
    addTask();
    let todos = [];

   function appendTodo(){
       $('#todoList').find('li').remove();
       $(todos).each(function(i,t) {
           $('#todoList').append('<li class="'+ i.status +'">'+
       '<input class="textTask" type="text" value='+ i.textTodo +'>'+
       '<input class="toggle" type="checkbox" id="'+ i +'"' +
               + (i.taskId == 'completed' ? ' checked ' : '' ) + '>' +
       '<button class="close" id="'+ i +'"></button></li>');
       });
       if (todos.status === "completed") {
           $('#todoList .toggle').prop('checked', true);
       } else if (todos.status === "active") {
           $('#todoList .toggle').prop('checked', false);
       }

   }


    function addTask() {
        $("#addBtn").click(function () {
            let valueTask =$("#todoInput").val();
            const todo ={textTodo:valueTask,
                         taskId:Math.random(),
                         status:false,}
            if(!(valueTask.trim())){
                alert("Enter text!")
            }
            $('#footer').show();
            todos.push(todo);
            appendTodo();
            console.log(todos);
            $("#todoInput").val("");
        });

        $('#todoInput').keydown(function(eventObject){
            if (eventObject.keyCode == 13) {
                $("#addBtn").click();
                return false;
            }

        });
    }



   //Удаление задачи
    $('#todoList').on('click', '.delTodo', function () {
         const idForDelete = $(this).parent().attr("id");
          let indexForDeleteTodoArray;
          todos.forEach((todo, i)=>{
              if(todo.id===idForDelete){
                  indexForDeleteTodoArray=i;
              }
          });
          todos.splice(indexForDeleteTodoArray, 1)
          $(this).parent().empty();
          console.log(todos)
    });





});



