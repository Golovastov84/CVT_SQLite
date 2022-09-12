$(function(){

    var numberClick = 0;
    let controlClick = [];

    const appendPeople = function(data){
        var peopleCode = '<a href="#" class="people-link" data-id="' +
            data.id + '">' + data.lastName + '</a><br>';
        $('#people-list')
            .append('<div>' + peopleCode + '</div>');

        var documentCode = '<a href="#" class="document-link" data-id="' +
                    data.id + '">' + data.dateDocument + '</a><br>';
        $('#document-list')
              .append('<div>' + documentCode + '</div>');

    };

    //Loading peoples on load page
//    $.get('/peoples/', function(response)
//    {
//        for(i in response) {
//            appendPeople(response[i]);
//        }
//    });

    //Show adding people form
    $('#show-add-people-form').click(function(){
        $('#people-form').css({display: 'flex'});
    });

//Closing adding people form
    $('#people-form').click(function(event){
        if(event.target === this) {
            $(this).css({display: 'none'});
//            location.reload();
        }
    });

    $('#people-put-form').click(function(event){
        if(event.target === this) {
            $(this).css({display: 'none'});
//            location.reload();
        }
    });

    //Getting people
    $(document).on('click', '.people-link', function(){
        var link = $(this);
        var peopleId = link.data('id');

        $.ajax({
            method: "GET",
            url: '/peoples/' + peopleId,
            success: function(response)
            {
                     if(!controlClick.includes(peopleId)){
                    var code = '<div class="people-one"><span>Дата рождения: ' + response.birthday +
                    '</span><p></p><button class="put-people" data-id="' + peopleId +
                    '">Редактировать</button><p></p><button class="dell-people" data-id="' + peopleId +
                    '">Удалить</button></div>';
                    link.parent().append(code);
                    controlClick.push(peopleId);
                   }
                 $('.put-people').click(function(){
                   $('#people-put-form > form').html('');
                   let fillingPeoplePutForm = '<h2>Редактирование данных о человеке</h2>';
                   fillingPeoplePutForm += '<p><label>Фамилия </label>';
                   fillingPeoplePutForm += '<input type="text" name="lastName" value="' + response.lastName +
                   '"></p>';
                   fillingPeoplePutForm += '<p><label>Имя </label>';
                   fillingPeoplePutForm += '<input type="text" name="firstName" value="' + response
                   .firstName + '"></p>';
                   fillingPeoplePutForm += '<p><label>Отчество </label>';
                   fillingPeoplePutForm += '<input type="text" name="patronymic" value="' + response
                   .patronymic + '"></p>';
                   fillingPeoplePutForm += '<p><label>Год рождения </label>';
                   fillingPeoplePutForm += '<input type="text" name="yearBirthday" value="' + response
                   .yearBirthday + '"></p>';
                   fillingPeoplePutForm += '<p><label>Месяц рождения </label>';
                   fillingPeoplePutForm += '<input type="text" name="monthBirthday" value="' + response
                   .monthBirthday + '"></p>';
                   fillingPeoplePutForm += '<p><label>День рождения </label>';
                   fillingPeoplePutForm += '<input type="text" name="dayBirthday" value="' + response
                   .dayBirthday + '"></p>';
                   fillingPeoplePutForm += '<p><label>Пол</label>';
                   fillingPeoplePutForm += '<input type="text" name="sex" value="' + response
                   .sex + '"></p>';
                   fillingPeoplePutForm += '<hr><button id="put-people-save" data-id="' + peopleId +
                   '">Редактировать</button>';
                   $('#people-put-form > form').append(fillingPeoplePutForm);
                   $('#people-put-form').css({display: 'flex'});
                   $('#put-people-save').click(function()
                       {
                           var data = $('#people-put-form form').serialize();
                           var link = $(this);
                           var peopleId = link.data('id');
                           $.ajax({
                               method: "PUT",
                               url: '/peoples/' + peopleId,
                               data: data,
                               success: function(response)
                               {
                                   $('#people-put-form').css('display', 'none');
                                   var people = {};
                                   people.id = response;
                                   var dataArray = $('#people-put-form form').serializeArray();
                                   for(i in dataArray) {
                                       people[dataArray[i]['header']] = dataArray[i]['value'];
                                   }
                                document.location.reload();
                                   appendPeople(people);
                               }
                           });
                           return false;
                       });
                });

                $('.dell-people').click(function(){
                   var link = $(this);
                   var peopleId = link.data('id');
                   $.ajax({
                       method: "DELETE",
                       url: '/peoples/' + peopleId,
                       success: function(response)
                      {
                       document.location.reload();
                       }
                   });
                   return false;
                });
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Человек не найден!');
                }
            }
        });
        return false;

    });



    //Adding People
    $('#save-people').click(function()
    {
        var data = $('#people-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/peoples/',
            data: data,
            success: function(response)
            {
                $('#people-form').css('display', 'none');
                var people = {};
                people.id = response;
                var dataArray = $('#people-form form').serializeArray();
                for(i in dataArray) {
                    people[dataArray[i]['header']] = dataArray[i]['value'];
                }
                appendPeople(people);
                document.location.reload();
            }
        });
        return false;
    });

});