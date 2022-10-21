package main.model;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)// было  SEQUENCE
    @Column(name = "id")
    private int id;

    @Column(name = "type_id")
    private int typeId;

    @Column(name = "people_id"/*, insertable = false, updatable = false*/)
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
