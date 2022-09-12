package main;

import main.model.Document;
import main.model.DocumentRepository;
import main.model.People;
import main.model.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class DefaultController {

    @Autowired
    PeopleRepository peopleRepository;

    @Autowired
    DocumentRepository documentRepository;

    @Value("${someParameter}")
    private int someParameter;

    @RequestMapping("/")
    public String index(Model model){
        Iterable<People> peopleIterable = peopleRepository.findAll();
        ArrayList<People> peoples = new ArrayList<>();
        for(People people : peopleIterable){
//            people.setSex("ж");
            /*people.setBirthday(people.getYearBirthday(), people.getMonthBirthday(),
                    people.getDayBirthday());*/
            peoples.add(people);
        }

        Iterable<Document> documentIterable = documentRepository.findAll();
        ArrayList<Document> documents = new ArrayList<>();
        for(Document document : documentIterable){
            document.setDayDate(document.getYearDate(), document.getMonthDate(),
                    document.getDayDate());
            documentRepository.save(document);
            documents.add(document);
        }

        model.addAttribute("documents", documents);
        model.addAttribute("peoples", peoples);
        model.addAttribute("peoplesCount", peoples.size());
        model.addAttribute("someParameter", someParameter);
        return "index";
    }
}
