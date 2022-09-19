$(function(){

var documents_Name_Id = '';
var last_Name_Id = '';
var people_id_fom_document = '';
//var people;

const appendTypeDocument = function(data){
        var typeDocumentCode = '<a href="#" class="type-document-link" data-id="' +
            data.id + '">' + data.name + '</a><br>';
        $('#type-document-list')
            .append('<div>' + typeDocumentCode + '</div>');
    };


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
               var people = {};
                people.id = response;
//          получение id people
                document.getElementById('idPeopleForDocument').value = response;
                var dataArray = $('#people-form form').serializeArray();
                for(i in dataArray) {
                    people[dataArray[i]['header']] = dataArray[i]['value'];
                }
//                appendPeople(people);
            }
        });
        // обновляет и текущую
        $('#people-form').css({display: 'none'});
//       заполнение типа документа
        $('#document-form').css({display: 'flex'});
        last_Name_Id = document.getElementById('lastNameId').value;
        return false;

    });


    // переход на страницу просмотра списка людей
    $('#document-link', '#viewing-list-of-people').click(function(){
           window.location.href = 'documentsTables';
            return false;
        });

//   выбор типа документа и переход к заполнению документа
    $('#filling-document').click(function(){
//   надо добавить post запрос добавления типа документа
        var data = $('#document-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/typeDocuments/',
            data: data,
            success: function(response)
            {
               var typeDocument = {};
                typeDocument.id = response;
//          получение id typeDocument
                document.getElementById('idTypeDocument').value = response;
                var dataArray = $('#document-form form').serializeArray();
                for(i in dataArray) {
                    typeDocument[dataArray[i]['header']] = dataArray[i]['value'];
                }
            }
        });
//      заполнение типа документа
        $('#document-form').css({display: 'none'});
//    document.getElementById("seriesDoc").value = "345";
//  извлечение данных
        documents_Name_Id = document.getElementById('documentsNameId').value;
        document.getElementById('idPeopleInDocument').value = document.getElementById('idPeopleForDocument').value;
        document.getElementById('documentsNameDocId').value = documents_Name_Id;
        document.getElementById('firstNameDocId').value = last_Name_Id;
        $('#document-filling-form').css({display: 'flex'});
        return false;
        });



//      добавление нового человека
        $('#add-new-person').click(function(){
                $('#document-filling-form').css({display: 'none'});
                $('#people-form').css({display: 'flex'});
//                document.location.reload();
                location.reload();
                return false;
        });

//      сохранение документа save-document
        $('#save-document').click(function()
            {
//document-filling-form
                var data = $('#document-filling-form form').serialize();
        //        var peopleData = $('#people-form form');
                $.ajax({

                    method: "POST",
                    url: '/documents/',
                    data: data,
                    success: function(response)
                    {
                        var document = {};
                        document.id = response;
                        var dataArray = $('#document-filling-form form').serializeArray();
                        for(i in dataArray) {
                            document[dataArray[i]['header']] = dataArray[i]['value'];
                        }
//                        appendPeople(people);
                    }
                });
        // обновляет и текущую
                $('#document-filling-form').css({display: 'none'});
        //       заполнение типа документа
                 document.getElementById('documentsNameId').value = "";
                $('#document-form').css({display: 'flex'});
                return false;
            });



    /*$(document).on('click', '#filling-document', function(){
        var link = $(this);

        var peopleId = peopleData.data('id');
        $.ajax({
            method: "GET",
            url: '/peoples/' + peopleId,
            success: function(response)
            {
               var code = '<h2>Добавление документа</h2><label>Название документа</label><input type="text"
               name="documentsName" value=""><p></p><label>ID Человека</label><input type="text"
               name="peopleId" value="' + response.id + '"><p></p>';
              link.parent().append(code);
            },
               $('#document-form').css({display: 'none'});
               // open add for document
               $('#document-filling-form').css({display: 'flex'});
                return false;
            });
        });*/
});