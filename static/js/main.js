$(document).ready(function(){

    $("#addnew").on('click' , function(){
        if($("#form1").is(':visible')){
            $("#form1").hide();
        }
        else{
            $("#form1").show();
        }
    });

    $('#submit').on('click', function(){
        var name = $('#name').val();
        var email = $('#email').val();
        var number = $('#number').val();

        if(name == ''){
            $('#name').css({"border-bottom": "2px solid red"})
            return false;
        }
        else{
            $('#name').css({"border-bottom": "0px"})
        }
        if(email == ''){
            $('#email').css({"border-bottom": "2px solid red"})
            return false;
        }
        else{
            $('#email').css({"border-bottom": "0px"})
        }
        if(number == ''){
            $('#number').css({"border-bottom": "2px solid red"})
            return false;
        }
        else{
            $('#number').css({"border-bottom": "0px"})
        }
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
        var formdata = {
            "name" : name,
            "email" : email,
            "number" : number,
        }

        $.ajax({
            type: 'POST',
            url: '/add_student/',
            datatype: 'json',
            data: formdata,
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken)
            },
            success:function(res){
                if(res.status == 200){
                    window.location.href = "../";
                }
            },
            error:function(res){
                if(res.status == 400){
                    $('#h1').text("Not Inserted");
                }
            },
        });
        return false;
    });

    $(".edit-btn").on('click',function(){
        const id = $(this).attr('data-id');
        if($("#editform").is(':visible')){
            $("#editform").hide();
        }
        else{
            $("#editform").show();
            $.ajax({
                type: "POST",
                url: "/edit_record/" + id,
                data: {
                    "id":id,
                },
                success:function(res){
                    alert("Succes");
                },
                error:function(res){
                    alert("Error");
                },
            });
        }
    });

    $(".delete-btn").on('click',function(){
        const id = $(this).attr('data-id');
        
        formdata = {
            "id": id,
        }

        $.ajax({
            type: "POST",
            url: "/delete_record/" + id,
            datatype: 'json',
            data: formdata,

            success:function(res){
                if(res.status == 200){
                    window.location.href = "../";
                }
            },
            error:function(res){
                if(res.status == 400){
                    alert("Not Deleted");
                }
            }
        });
    });
});