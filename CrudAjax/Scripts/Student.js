$(document).ready(function() {
    load();
});

function load() {
    $.ajax({
        url: "/Student/ListOfStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success:function(result) {
            var htm = '';
            $.each(result,
                function(key, item) {
                    htm += '<tr>';
                    htm += '<td>' + item.Id + '</td>';
                    htm += '<td>' + item.Name + '</td>';
                    htm += '<td>' + item.Email + '</td>';
                    htm += '<td>' + item.Address + '</td>';
                    htm += '<td><a href="#" onclick="return getById(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delete('+item.Id+')">Delete</a></td>';
                    htm += '</tr>';
                });
            $('.tbody').html(htm);
        },
        error:function(errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function Add() {
    var resu = validation();
    if (resu === false) {
        return false;
    }
    var stdObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val()
    };
    $.ajax({
        url: "/Student/Add",
        data: JSON.stringify(stdObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success:function() {
            load();
            $('#myModal').modal('hide');

           
        },
        error:function(errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function getById(Id) {
    $('#Name').css('border-color', 'lightgoldenrodyellow');
    $('#Email').css('border-color', 'lightgoldenrodyellow');
    $('#Address').css('border-color', 'lightgoldenrodyellow');
    $.ajax({
        url: "/Student/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Email').val(result.Email);
            $('#Address').val(result.Address);
            $('#myModal').modal('show');
            $('#myModalLevel').html("Update Student Record");
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error:function(errorResult) {
            alert(errorResult.responseText);
        }
    });
    return false;
}

function Update() {
    var resu = validation();
    if (resu === false) {
        return false;
    }
    var stdObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val()
    };
    $.ajax({
        url: "/Student/Update/" + Id,
        data: JSON.stringify(stdObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(result) {
            load();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Email').val("");
            $('#Address').val("");
        },
        error: function (errorResult) {
            alert(errorResult.responseText);
        }
});
}

function Delete(Id) {
    var answer = confirm("Are you sure??");
    if (answer) {
        $.ajax({
            url: "/Student/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function(result) {
                load();
            },
            error: function(errorResult) {
                alert(errorResult.responseText);
            }
        });
    }
}




function validation() {
    var isValid = true;
    if ($('#Name').val().trim() === "") {
        $('#Name').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Name').css('border-color', 'lightcyan');
    }
    if ($('#Email').val().trim() === "") {
        $('#Email').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Email').css('border-color', 'lightcyan');
    }
    if ($('#Address').val().trim() === "") {
        $('#Address').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Address').css('border-color', 'lightcyan');
    }
    return isValid;
}
function clear() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Email').val("");
    $('#Address').val("");
    $('#btnAdd').show();
    $('#btnUpdate').hide();
}
