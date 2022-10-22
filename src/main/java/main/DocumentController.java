package main;

import main.model.Document;
import main.model.DocumentRepository;
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
public class DocumentController {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private DocumentRepository documentRepository;

    public DocumentController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping("/documentsTables/documents")
    public List<Document> ListDocument() {
        Iterable<Document> documentIterable = documentRepository.findAll();

        ArrayList<Document> documents = new ArrayList<>();
        for (Document document : documentIterable) {
            documents.add(document);
        }
        return documents;
    }


    @PostMapping("/documents/")
    @ResponseBody
    public int addDocument(Document document) {
        if (documentRepository.count() == 0) {
            document.setId(1);
        }
        Document newDocument = documentRepository.save(putData(document));
        return newDocument.getId();
    }

    @GetMapping("/documentsTables/documents/{id}")
    public ResponseEntity<?> getDocument(@PathVariable int id) {
        Optional<Document> optionalDocument = documentRepository.findById(id);
        if (!optionalDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(optionalDocument.get(), HttpStatus.OK);
    }

    @GetMapping("/documentsTables/{peopleId}")
    public ResponseEntity<List<Document>> getDocumentForPeople(@PathVariable int peopleId) {
        Iterable<Document> documentIterable  = documentRepository.findAll();
        ArrayList<Document> documents = new ArrayList<>();
        for (Document document : documentIterable) {
            if(document.getPeopleId() == peopleId) {
                documents.add(document);
            }
        }
        if (documents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @DeleteMapping("/documentsTables/documents/{id}")
    public ResponseEntity<?> dellDocument(@PathVariable int id) {
        Optional<Document> optionalDocument = documentRepository.findById(id);
        if (!optionalDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        documentRepository.deleteById(id);
        return new ResponseEntity<>(documentRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/documentsTables/documents/{id}")
    @ResponseBody
    public ResponseEntity<?> putDocumentId(Document newDocument, @PathVariable int id) {
        Optional<Document> optionalDocument = documentRepository.findById(id);
        if (!optionalDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Document modifiedDocument = putData(newDocument);
        documentRepository.save(modifiedDocument);
        return new ResponseEntity<>(modifiedDocument, HttpStatus.OK);
    }

    @DeleteMapping("/documentsTables/documents/")
    public ResponseEntity dellAllDocuments() {
        if (documentRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        documentRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public static Document putData(Document document) {
        document.setDateDocument(document.getYearDate(), document.getMonthDate(), document.getDayDate());
        return document;
    }
}
