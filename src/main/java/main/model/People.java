package main.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "people")
public class People {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // было  SEQUENCE
    @Column(name = "id")
    private int id;


    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    private String patronymic;

    private int yearBirthday;

    private int monthBirthday;

    private int dayBirthday;

    private LocalDate birthday;

    private String sex;


    public People() {
    }

    public People(int yearBirthday, int monthBirthday, int dayBirthday) {
        birthday = LocalDate.of(yearBirthday, monthBirthday, dayBirthday);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public int getYearBirthday() {
        return yearBirthday;
    }

    public void setYearBirthday(int yearBirthday) {
        this.yearBirthday = yearBirthday;
    }

    public int getMonthBirthday() {
        return monthBirthday;
    }

    public void setMonthBirthday(int monthBirthday) {
        this.monthBirthday = monthBirthday;
    }

    public int getDayBirthday() {
        return dayBirthday;
    }

    public void setDayBirthday(int dayBirthday) {
        this.dayBirthday = dayBirthday;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(int yearBirthday, int monthBirthday, int dayBirthday) {
        this.birthday = LocalDate.of(yearBirthday, monthBirthday, dayBirthday);
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }


    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPeopleDate(){
        LocalDate localDate = LocalDate.now();
        Period period = Period.between(localDate, birthday);
        int diff = Math.abs(period.getYears());
        String messageAge = "Возраст в годах: ".concat(String.valueOf(diff));
        return messageAge;
    }
}
