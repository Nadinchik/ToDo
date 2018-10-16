$(document).ready(function ($) {
    addTask();
    let todos = [];
    let taskId = 0;

    function appendTodo() {
        $('#todoList').find('li').remove();
        console.log('todos -==> ', todos);
        todos.forEach((item, index) => {
            if(item.status){
                $('#todoList').append(`<li class="todoItem todoItem_checked"  id={`${taskId}`}>`+
                `<input class="todoCheckbox" type="checkbox" checked>`+
                `<input class="textTask" type="text" readonly  value="' + item.textTodo + '">`+ `<button class="delTodo" id="' + index + '">x</button>`+ '</li>`);
            }else{
                $('#todoList').append(`<li class="todoItem todoItem_checked"  id={`${taskId}`}>`+
                    `<input class="todoCheckbox" type="checkbox">`+
                    `<input class="textTask" type="text" readonly  value="' + item.textTodo + '">`+ `<button class="delTodo" id="' + index + '">x</button>`+ '</li>`);
            }

        });
        // if (checked==true) {
        //     $('#' + taskId).find(':checkbox').prop('checked', true);
        // } else {
        //     $('#' + taskId).find(':checkbox').prop('checked', false);
        // }
        todos.filter(function (task) {
            if (task.status == false) {
                activeCount += 1;
                console.log(activeCount);
            } else {
                completedCount += 1;
            }
        });
        $('#activeCount').text('Active: ' + activeCount);
        $('#completedCount').text('Completed: ' + completedCount);
        activeCount = 0;
        completedCount = 0;
    }


    function completed() {
        if ($(this).parent().css('textDecoration') == 'line-through') {
            $(this).parent().css('textDecoration', 'none');
        } else {
            $(this).parent().css('textDecoration', 'line-through');
        }
    }


    function addTask() {
        $("#addBtn").click(function () {
            let valueTask = $("#todoInput").val();
            let todo = {
                textTodo: valueTask,
                taskId: Math.random(),
                status: false,
            };
            if (!(valueTask.trim())) {
                alert("Enter text!");
            }
            $('#footer').show();
            todos.push(todo);
            appendTodo();
            console.log(todos);
            $("#todoInput").val("");
        });

        $('#todoInput').keydown(function (eventObject) {
            if (eventObject.keyCode === 13) {
                $("#addBtn").click();
                return false;
            }
        });

        //edit
        $('#todoList').on('dblclick', '.textTask', function () {
            var thisData = this.innerHTML,
                $el = $('<input type="text" class="inEditText"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
            $(this).find(".text").hide();
            $(this).find(".delTodo").hide();

        });
    }


    function checkTask() {
        let id = $(this).parents('li').prop('id');
        if ($(this).prop('checked')) {
            for (task of todos) {
                if (task.id == id) {
                    task.status = true;
                }
            }
        } else {
            for (task of todos) {
                if (task.id == id) {
                    task.status = false;
                }
            }
        }
        appendTodo();
    }


    $("#allCheck").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });

    $('#delCompleteTodo').on('click', delComplete);


    function delComplete() {
        for (i = 0; i < todos.length; i++) {
            if (todos[i].status == true) {
                todos.splice(todos.indexOf(todos[i]), 1);
                --i;
            }
        }
        $('#allCheck').prop('checked', false);
        filteredList = todos.slice();

    }


    //Удаление задачи
    $('#todoList').on('click', '.delTodo', function () {
        const idForDelete = $(this).parent().attr("id");
        let indexForDeleteTodoArray;
        todos.forEach((todo, i) => {
            if (todo.id === idForDelete) {
                indexForDeleteTodoArray = i;
            }
        });
        if (indexForDeleteTodoArray) {
            todos.splice(indexForDeleteTodoArray, 1);
        }
        $(this).parent().empty();
        console.log(todos);
    });


});




});



