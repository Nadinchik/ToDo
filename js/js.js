$(document).ready (function($) {
    addTask();
    let todos = [];

    function appendTodo(){
        $('#todoList').find('li').remove();
        $(todos).each(function(i,t) {
            $('#todoList').append('<li class="'+ t.status +'">'+
                '<input class="toggle" type="checkbox">' +
                '<input class="textTask" type="text" readonly  value="'+ t.textTodo +'">'+
                '<button class="delTodo" id="'+ i +'">x</button></li>');
        });
        if (todos.status === "completed") {
            $('#todoList .toggle').prop('checked', true);
        } else if (todos.status === "active") {
            $('#todoList .toggle').prop('checked', false);
        }
        tasksCount();
    }


    function completed() {
        if ($(this).parent().css('textDecoration') == 'line-through' ) {
            $(this).parent().css('textDecoration', 'none');
        } else {
            $(this).parent().css('textDecoration', 'line-through');
        }
    }

    function tasksCount() {
        $('.count').text(todos.length);
        if (todos.length < 1) {
            $('#footer').hide();
        }
    }


    function addTask() {
        $("#addBtn").click(function () {
            let valueTask =$("#todoInput").val();
            let todo ={textTodo:valueTask,
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
            if (eventObject.keyCode === 13) {
                $("#addBtn").click();
                return false;
            }
        });

//checkbox
        $('#todoList').on('click', '.toggle', function (e) {
            var id = parseInt(e.target.dataset.id);
            todos[id].status = "completed";
            if (!$(this).prop("checked")) {
                todos[id].status = "active";
            }
            appendTodo();
        });
    }


    $("#allToggle").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ($('li.head').css('check') == 'line-through' ) {
            $('li.head').css('check', 'none');
        } else {
            $('li.head').css('check', 'line-through');
        }
    });

    $(document).on('click', '.toggle', completed);
    $("#delCompleteTodo").click(delComplete());


    $('.todoItem').dblclick('.textTask', function (e) {
        let parent=$(this);
        const input=parent.find('.textTask');
        const id=parent.attr('id');
        input.prop("readonly", false);
        input.keydown(function(e){
            if(e.keyCode === 13){
                appendTodo();
            }
        });
        $('.textTask').on("blur", function (e) {
            appendTodo();
        })
    })

    function delComplete(){
        for(let i=0; i<todos.length; i++){
            if(todos[id].check == true){
                todos[id].splice(todos, indexOf(todos[i],1))
                --i
            }
        }
        $('#delCompleteTodo').on('click', delComplete);
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
        todos.splice(indexForDeleteTodoArray, 1);
        $(this).parent().empty();
        console.log(todos)
    });



});



