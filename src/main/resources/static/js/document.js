$(function(){

    var numberClick = 0;
    let controlClick = [];
    /*var reloadDocument = 0;
    if(reloadDocument == 0){
    document.location.reload();
    reloadDocument = 1;
    }*/


    const appendPeople = function(data){
//        var agePeople = _calculateAge(data.birthday);
        var peopleCode = '<a href="#" class="people-link" data-id="' +
            data.id + '">' + data.lastName + ' ' + data.firstName + ' ' + data.patronymic + '</a><br>';
        var agePeople = '<div> ' + data.getPeopleDate() + '</div>';
//        var agePeople = Проверка;
        $('#people-list')
            .append('<div>' + peopleCode + '</div>');
        $('#people-list').append('<div>' + agePeople + '</div>');
        /*var addName = '<div> ' + data.firstName + ' ' + data.patronymic + ' Возраст: </div>';

        $('#people-list')
                    .append(addName);*/
    };

     $.get('/documentsTables/peoples/', function(response)
        {
            for(i in response) {
                appendPeople(response[i]);
            }
        });

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const appendDocument = function(data){

            var documentCode = '<a href="#" class="document-link-doc" data-id="' +
                        data.id + '">' + data.peopleId + '</a><br>';
            $('#document-list')
                  .append('<div>' + documentCode + '</div>');
        };

    $(document).on('click', '.document-link-doc', function(){
            var link = $(this);
            var documentId = link.data('id');

            $.ajax({
                method: "GET",
                url: '/documentsTables/documents/' + documentId,
                success: function(response)
                {
//                     if(!controlClick.includes(documentId)){
                var code = '<div class="document-one"><span>Номер документа: ' + response.typeId +
                '</span><p></p><button class="put-document" data-id="' + documentId +
                '">Редактировать</button><p></p><button class="dell-document" data-id="' + documentId +
                '">Удалить</button></div>';
                link.parent().append(code);
//                    controlClick.push(documentId);
    //                   }
                $('.dell-document').click(function(){
                                   var link = $(this);
                                   var documentId = link.data('id');
                                   $.ajax({
                                       method: "DELETE",
                                       url: '/documents/' + documentId,
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
                        alert('Документ не найден!');
                    }
                }
            });
                   return false;

               });

 });