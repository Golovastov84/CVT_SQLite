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

    /*const appendDocument = function(data){
            var documentCode = '<a href="#" class="type-document-link" data-id="' +
                data.id + data.typeId'">' + data.typeId + '</a><br>';
            $('#type-document-list-people')
                .append('<div>' + documentCode + '</div>');
        };*/



    // Выбор человека
        $(document).on('click', '.people-link', function(){
            var link = $(this);
            var peopleId = link.data('id');
            $('#people-block').css({display: 'none'});

        $.ajax({
                method: "GET",
                url: '/documentsTables/' + peopleId,
                success: function(response)
                {
//                    var code = '';
                    for (var document of response) {
                    var nameDocument = '';
                    var documentTypeId = document.typeId;
                    $.ajax({
                        method: "GET",
                        url: '/documentsTables/typeDocuments/' + documentTypeId,
                        success: function(response)
                        {
                        nameDocument = response.name;
                         var code = '<a href="#" class="type-document-link" data-id="' + document.id + document
                                             .typeId + '">' + nameDocument + '</a><br>';
                         $('#type-document-list-people').append('<div>' + code + '</div>');
                        },
                        error: function(response)
                            {
                                if(response.status == 404) {
                                    alert('Тип документа не найден!');
                                }
                            }
                    });

                    }
                     $('#people-list-documents').css({display: 'flex'});
                },
                error: function(response)
                    {
                        if(response.status == 404) {
                            alert('Документы не найдены!');
                        }
                    }
                });
             return false;
        });

 });