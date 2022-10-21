$(function(){

    var peopleFIO = '';
    var documentName = '';

    const appendPeople = function(data){
        var peopleCode = '<a href="#" class="people-link" data-id="' +
            data.id + '">' + data.lastName + ' ' + data.firstName + ' ' + data.patronymic + '</a><br>';
        var agePeople = '<div> ' + data.getPeopleDate() + '</div>';
        $('#people-list')
            .append('<div>' + peopleCode + '</div>');
        $('#people-list').append('<div>' + agePeople + '</div>');
    };

// Выбор человека
        $(document).on('click', '.people-link', function(){
            var link = $(this);
            var peopleId = link.data('id');
            peopleFIO = link.text();
            $('#people-block').css({display: 'none'});
        $.ajax({
                method: "GET",
                url: '/documentsTables/' + peopleId,
                success: function(response)
                {
                    var documentTypeId = '';
                    for (var document of response) {
                        var nameDocument = '';
                        documentTypeId = document.typeId;
                        var idDocument = document.id;
                        functionGetTypeDocument(documentTypeId, idDocument);
                    };
                },
                error: function(response)
                    {
                        if(response.status == 404) {
                            alert('Документы не найдены!');
                        }
                    }
                });
                $('#people-FIO').append(peopleFIO);
                $('#people-list-documents').css({display: 'flex'});
             return false;
        });

// Выбор документа
        $(document).on('click', '.type-document-link', function(){
            var link = $(this);
            var documentId = link.data('id');
            documentName = link.text();
        $('#people-list-documents').css({display: 'none'});
        $.ajax({
                method: "GET",
                url: '/documentsTables/documents/' + documentId,
                success: function(response)
                {
                 $('#people-FIO-for-document').replaceWith(peopleFIO);
                 document.getElementById('documentsNameDocId').value = documentName;
                 document.getElementById('idDocument').value = response.id;
                 document.getElementById('idTypeDocument').value = response.typeId;
                 document.getElementById('idPeopleInDocument').value = response.peopleId;
                 document.getElementById('seriesId').value = response.series;
                 document.getElementById('numberId').value = response.number;
                 document.getElementById('yearDateId').value = response.yearDate;
                 document.getElementById('monthDate').value = response.monthDate;
                 document.getElementById('dayDate').value = response.dayDate;
                },
                    error: function(response)
                        {
                            if(response.status == 404) {
                                alert('Документ не найден!');
                            }
                        }
                    });
                $('#list-documents').css({display: 'flex'});
                 return false;
            });

// переход к списку людей
    $('.viewing-list-people').click(function(){
           $('#list-documents').css({display: 'none'});
           $('#people-block').css({display: 'flex'});
         $('#people-FIO').reset();
         $('#type-document-list-people').reset();
            return false;
        });

// переход к списку людей из документов человека
    $('.document-link-for-list').click(function(){
           $('#people-list-documents').css({display: 'none'});
           $('#people-block').css({display: 'flex'});
           $('#people-FIO').reset();
           $('#type-document-list-people').reset();
            return false;
        });

// переход к списку документов этого человека
    $('.view-another-document').click(function(){
           $('#list-documents').css({display: 'none'});
           $('#people-list-documents').css({display: 'flex'});
            return false;
        });

    function functionGetTypeDocument(documentTypeId, idDocument) {
        $.ajax({
            method: "GET",
            url: '/documentsTables/typeDocuments/' + documentTypeId,
            success: function(response)
            {
            nameDocument = response.name;
             var code = '<a href="#" class="type-document-link" data-id="' + idDocument +'">' +
             nameDocument + '</a><br>';
             $('#type-document-list-people').append('<div>' + code + '</div>');
            },
            error: function(response)
                {
                    if(response.status == 404) {
                        alert('Тип документа не найден!');
                    }
                }
        });
        return false;
   }
 });