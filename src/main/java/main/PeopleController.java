package main;

import main.model.People;
import main.model.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class PeopleController {

    @Autowired
    private PeopleRepository peopleRepository;

    public PeopleController(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    @GetMapping("/documentsTables/peoples/")
    public List<People> ListPeople() {
        Iterable<People> peopleIterable = peopleRepository.findAll();

        ArrayList<People> peoples = new ArrayList<>();
        for (People people : peopleIterable) {
            peoples.add(people);
        }
        return peoples;
    }

    @PostMapping("/peoples/")
    @ResponseBody
    public int addPeople(People people) {
        if (peopleRepository.count() == 0) {
            people.setId(1);
        }
        People newPeople = peopleRepository.save(putBirthday(people));
        return newPeople.getId();
    }

    @GetMapping("/documentsTables/peoples/{id}")
    public ResponseEntity<?> getPeople(@PathVariable int id) {
        Optional<People> optionalPeople = peopleRepository.findById(id);
        if (!optionalPeople.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(optionalPeople.get(), HttpStatus.OK);
    }

    @DeleteMapping("/documentsTables/peoples/{id}")
    public ResponseEntity<?> dellPeople(@PathVariable int id) {
        Optional<People> optionalPeople = peopleRepository.findById(id);
        if (!optionalPeople.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        peopleRepository.deleteById(id);
        return new ResponseEntity<>(peopleRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/documentsTables/peoples/{id}")
    @ResponseBody
    public ResponseEntity<?> putPeopleId(People newPeople, @PathVariable int id) {
        Optional<People> optionalPeople = peopleRepository.findById(id);
        if (!optionalPeople.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
       // нужен код перезаписи
        People modifiedPeople = putBirthday(newPeople);
        peopleRepository.save(modifiedPeople);
        return new ResponseEntity<>(modifiedPeople, HttpStatus.OK);
    }

    @DeleteMapping("/documentsTables/peoples/")
    public ResponseEntity dellAllPeoples() {
        if (peopleRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        peopleRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public static People putBirthday(People people) {
        people.setBirthday(people.getYearBirthday(), people.getMonthBirthday(), people.getDayBirthday());
        return people;
    }
}
