$(function(){

var documents_Name_Id = '';
var last_Name_Id = '';
var people_id_fom_document = '';
var nowForPeople = new Date();
var nowYearForPeople = nowForPeople.getFullYear();
var nowMonthForPeople = nowForPeople.getMonth() + 1;
var nowDayForPeople = nowForPeople.getDate();
var dayBirthdayPeople;

// проверка ввода ФИО
const regexFIO = /^[ЁА-ЯA-Z][а-яёa-z-]*$/;
const regexDate = /^[0-9]+$/;
const regexManWoman = /^[мМЖжmMWw]$/;
const regexSeriesDocument = /^[ЁА-ЯA-Zа-яёa-z0-9]+$/;
const regexNumberDocument = /^[0-9]+$/;


const appendTypeDocument = function(data){
        var typeDocumentCode = '<a href="#" class="type-document-link" data-id="' +
            data.id + data.name + '">' + data.name + '</a><br>';
        $('#type-document-list').append('<div>' + typeDocumentCode + '</div>');
    };



//Adding People
    $('#save-people').click(function()
    {
// проверка ввода ФИО
         var lastNameIdIf = document.getElementById('lastNameId').value;
        var firstNameIdIf = document.getElementById('firstNameId').value;
        var patronymicIdIf = document.getElementById('patronymicId').value;
        var peopleFIOBoolean = regexFIO.test(lastNameIdIf) && regexFIO.test(firstNameIdIf) && regexFIO.test
        (patronymicIdIf);
// проверка даты
        var yearBirthdayIdIf = document.getElementById('yearBirthdayId').value;
        var monthBirthdayIdIf = document.getElementById('monthBirthdayId').value;
        var dayBirthdayIdIf = document.getElementById('dayBirthdayId').value;
        var peopleBirthdayRegexBoolean = regexDate.test(yearBirthdayIdIf) && regexDate.test(monthBirthdayIdIf)
        && regexDate.test(dayBirthdayIdIf) && checkDate(yearBirthdayIdIf, monthBirthdayIdIf, dayBirthdayIdIf);
        var peopleYearBoolean = yearBirthdayIdIf > 1900 && yearBirthdayIdIf <= nowYearForPeople;
        var peopleManWomanIdIf = document.getElementById('sexId').value;
        var peopleManWomanRegexBoolean = regexManWoman.test(peopleManWomanIdIf);
        if(!peopleFIOBoolean){
            alert("Неравильный формат ввода Фамилии, Имени, Отчества.");
            return false;
        } else
        if(!peopleBirthdayRegexBoolean){
            alert("Неравильный формат ввода года 1900, месяца 1, дня 1 рождения.");
            return false;
        } else
            if(!peopleYearBoolean){
            alert("Год рождения не входит в интервал 1900 - " + nowYearForPeople + " лет.");
            return false;
        } else
        if(yearBirthdayIdIf == nowYearForPeople && (monthBirthdayIdIf > nowMonthForPeople ||
        (monthBirthdayIdIf == nowMonthForPeople && dayBirthdayIdIf > nowDayForPeople))){
            alert("Указанная дата в будущем.");
            return false;
        } else
        if(!peopleManWomanRegexBoolean){
            alert("Неравильный формат ввода пола человека м или ж (m or w).");
            return false;
        }
        else
        {
        dayBirthdayPeople = new Date(yearBirthdayIdIf, monthBirthdayIdIf - 1, dayBirthdayIdIf);
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
            }
        });
// обновляет и текущую
        $('#people-form').css({display: 'none'});
//заполнение типа документа
        $('#document-form').css({display: 'flex'});
        last_Name_Id = document.getElementById('lastNameId').value;
        return false;
     }
    });

// переход на страницу просмотра списка людей
    $('.document-link').click(function(){
           window.location.href = 'documentsTables';
            return false;
        });

//   выбор типа документа и переход к заполнению документа
    $('#filling-document').click(function(){
    var typeDocumentIdIf = document.getElementById('documentsNameId').value;
    var typeDocumentNullBoolean = typeDocumentIdIf == '';
    var typeDocumentHtmlCollections = document.getElementsByClassName('type-document-link');
    if(typeDocumentNullBoolean){
        alert("Введите своё название типа документа, или выберете из имеющихся в базе.");
        return false;
    } else {
    var matchFound = false;
    for (let i = 0; i < typeDocumentHtmlCollections.length; i++) {
          if(typeDocumentHtmlCollections.item(i).textContent == typeDocumentIdIf){
          matchFound = true;
          };
        }
        if(!matchFound){
//   post запрос добавления типа документа
    var data = $('#documentsNameId').serialize();
          $.ajax({
              method: "POST",
              url: '/typeDocuments/',
              data: data,
              success: function(response)
              {
                 var typeDocument = {};
                  typeDocument.id = response;
                  typeDocument.name = document.getElementById('documentsNameId').value;
    //    добавление типа документа в список выбора
                  appendTypeDocument(typeDocument);
    //          получение id typeDocument
                  document.getElementById('idTypeDocument').value = response;
              }
          });
    }
//      заполнение типа документа
        $('#document-form').css({display: 'none'});
//  извлечение данных
        documents_Name_Id = document.getElementById('documentsNameId').value;
        document.getElementById('idPeopleInDocument').value = document.getElementById('idPeopleForDocument').value;
        document.getElementById('documentsNameDocId').value = documents_Name_Id;
        document.getElementById('firstNameDocId').value = last_Name_Id;
        $('#document-filling-form').css({display: 'flex'});
        return false;
        }
        });

// Выбор типа документа из предложенных
    $(document).on('click', '.type-document-link', function(){
        var link = $(this);
        var typeDocumentId = link.data('id');
        $('#document-form').css({display: 'none'});
        document.getElementById('idTypeDocument').value = typeDocumentId;
        document.getElementById('documentsNameDocId').value = link.data('name');
        document.getElementById('firstNameDocId').value = last_Name_Id;
        document.getElementById('idPeopleInDocument').value = document.getElementById('idPeopleForDocument').value;
        $('#document-filling-form').css({display: 'flex'});
         return false;
    });


//      добавление нового человека
        $('#add-new-person').click(function(){
                $('#document-filling-form').css({display: 'none'});
                $('#people-form').css({display: 'flex'});
                location.reload();
                return false;
        });

//      сохранение документа save-document
        $('#save-document').click(function()
            {
            var seriesDocumentIdIf = document.getElementById('seriesId').value;
            var seriesDocumentRegexBoolean = regexSeriesDocument.test(seriesDocumentIdIf);
            var numberDocumentIdIf = document.getElementById('numberId').value;
            var numberDocumentRegexBoolean = regexNumberDocument.test(numberDocumentIdIf);
            var yearIssueDocumentIdIf = document.getElementById('yearDateId').value;
            var monthIssueDocumentIdIf = document.getElementById('monthDate').value;
            var dayIssueDocumentIdIf = document.getElementById('dayDate').value;
            var issueDocumentRegexBoolean = regexDate.test(yearIssueDocumentIdIf) && regexDate.test
            (monthIssueDocumentIdIf) && regexDate.test(dayIssueDocumentIdIf) && checkDate
            (yearIssueDocumentIdIf, monthIssueDocumentIdIf, dayIssueDocumentIdIf);
            var issueDocumentBoolean = yearIssueDocumentIdIf > 1900 && yearIssueDocumentIdIf <=
            nowYearForPeople;
            var dayIssueDocument = new Date(yearIssueDocumentIdIf, monthIssueDocumentIdIf - 1,
            dayIssueDocumentIdIf);
            if(!seriesDocumentRegexBoolean){
                alert("Неравильный формат ввода серии документа.");
                return false;
            } else
             if(!numberDocumentRegexBoolean){
                alert("Неравильный формат ввода номера документа.");
                return false;
                } else
            if(!issueDocumentRegexBoolean){
                alert("Неравильный формат ввода года 1900, месяца 1, дня 1 оформления документа.");
                return false;
            } else
                if(!issueDocumentBoolean){
                alert("Год оформления документа не входит в интервал 1900 - " + nowYearForPeople + " лет.");
                return false;
            } else
            if(yearIssueDocumentIdIf == nowYearForPeople && (monthIssueDocumentIdIf > nowMonthForPeople ||
            (monthIssueDocumentIdIf == nowMonthForPeople && dayIssueDocumentIdIf > nowDayForPeople))){
                alert("Указанная дата в будущем.");
                return false;
            } else
            if(dayBirthdayPeople > dayIssueDocument){
                alert("Указанная дата раньше даты рождения.");
                return false;
            } else

            {
                var dataDoc = $('#document-filling-form form').serialize();
                $.ajax({
                    method: "POST",
                    url: '/documents/',
                    data: dataDoc,
                    success: function(response)
                    {
                        var document = {};
                        document.id = response;
                        var dataArray = $('#document-filling-form form').serializeArray();
                        for(i in dataArray) {
                            document[dataArray[i]['header']] = dataArray[i]['value'];
                        }
                    }
                });
// обновляет и текущую
                $('#document-filling-form').css({display: 'none'});
                document.getElementById('seriesId').value = "";
                document.getElementById('numberId').value = "";
                document.getElementById('yearDateId').value = "";
                document.getElementById('monthDate').value = "";
                document.getElementById('dayDate').value = "";
//заполнение типа документа
                 document.getElementById('documentsNameId').value = "";
                $('#document-form').css({display: 'flex'});
                return false;
                }
            });

// Проверка существовании даты
        function checkDate(year, month, day) {
            var dateCheck = new Date(year, month - 1, day);
            if (dateCheck.getFullYear() == year && (dateCheck.getMonth() + 1) == month && dateCheck.getDate()
            == day) {
                return true;
            } else {
                return false;
            }
        }
});