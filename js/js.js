
$(document).ready (function($) {
    addTask();
    let todos = [];


    function addTask() {
        $("#addBtn").click(function () {
            let valueTask =$("#myInput").val();
            const todo ={textTodo:valueTask,
                         id:Math.random(),
                         status:false,}
            if(!(valueTask.trim())){
                alert("Enter text!")
            }
            todos.push(todo);

            let addElem="<li id='"+todo.id+"'>" +
                "<input type='checkbox'" +
                " name='todoDone'"+
                " class='todoDone'"+
                " value='" + valueTask + "'/> " +
                valueTask +
                "<button class='delTodo'>Del</button></li>";
            $("#todoList").append(addElem);

            console.log(todos);
            $("#myInput").val("");

        });

        $('#myInput').keydown(function(eventObject){
            if (eventObject.keyCode == 13) {
                $("#addBtn").click();
                return false;
            }

        });
    }

    $('#todoList').on('click', '.delTodo', function () {

         const idForDelete = $(this).parent().attr("id");
          let indexForDeleteTodoArray;
          todos.forEach((todo, i)=>{
              if(todo.id===idForDelete){
                  indexForDeleteTodoArray=i;
              }
          });
          todos.splice(idForDelete, 1)
          $(this).parent().empty();
          console.log(todos)
    });


    function completeTodoItem() {
        $(this).parent().toggleClass("strike");
    }

    $('#todoList').on('click', function (ev) {
        if (ev.target.tagName === 'li') {
            ev.target.classList.toggle('checked');
        }
    }, false);



    $(document).on('click', ".todo-item-done", completeTodoItem)

});



