package main.model;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;

@Entity
@Table(name = "documents")
public class Document {

    /*@Autowired
    PeopleRepository peopleRepository;*/


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)// было  SEQUENCE
    @Column(name = "id")
    private int id;

    @Column(name = "type_id")
    private int typeId;

   /* // надо получить объект из people
    @ManyToOne (fetch = FetchType.LAZY)
//   @JoinColumn(name = "people_id", nullable = true, insertable = true, updatable = true)
    private People people;*/

    @Column(name = "people_id"/*, insertable = false, updatable = false*/)
//    @JoinColumn(name = "people_id", nullable = true, insertable = true, updatable = true)
    private int peopleId;

    private String series;

    private String number;

    @Column(name = "year_date")
    private int yearDate;

    @Column(name = "month_date")
    private int monthDate;

    @Column(name = "day_date")
    private int dayDate;

    @Column(name = "date")
    private LocalDate dateDocument;

    /*@Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(!(o instanceof Document)) return false;
        return id != 0 && id == (((Document) o).getId());
    }

    @Override
    public int hashCode(){
        return getClass().hashCode();
    }*/

    public Document() {
    }

    public Document(int yearDate, int monthDate, int dayDate) {
        dateDocument = LocalDate.of(yearDate, monthDate, dayDate);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

   /* public People getPeople() {
        Iterable<People> peopleIterable = peopleRepository.findAll();
        People people1 = null;
        for(People people : peopleIterable){
           if(people.getId() == peopleId){
               people1 = people;
           }
        }

        return people1;
    }

    public void setPeople(People people) {

        Iterable<People> peopleIterable = peopleRepository.findAll();
        for(People people1 : peopleIterable){
            if(!people1.equals(people) && people1.getId() == people.getId()){
                peopleRepository.deleteById(people1.getId());
                peopleRepository.save(people);
                this.people = people;
            } else {
                peopleRepository.save(people);
                this.people = people1;
            }
        }
    }*/

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getYearDate() {
        return yearDate;
    }

    public void setYearDate(int yearDate) {
        this.yearDate = yearDate;
    }

    public int getMonthDate() {
        return monthDate;
    }

    public void setMonthDate(int monthDate) {
        this.monthDate = monthDate;
    }

    public int getDayDate() {
        return dayDate;
    }

    public void setDayDate(int dayDate) {
        this.dayDate = dayDate;
    }



    public LocalDate getDateDocument() {
        return dateDocument;
    }

    public void setDateDocument(LocalDate dateDocument) {
        this.dateDocument = dateDocument;
    }

    public void setDateDocument(int yearDate, int monthDate, int dayDate) {
        this.dateDocument = LocalDate.of(yearDate, monthDate, dayDate);
    }

    public int getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(int peopleId) {
        this.peopleId = peopleId;
    }
}
