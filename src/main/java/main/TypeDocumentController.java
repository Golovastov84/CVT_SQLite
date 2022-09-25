package main;

import main.model.TypeDocument;
import main.model.DocumentRepository;
import main.model.PeopleRepository;
import main.model.TypeDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@RestController
@Controller
public class TypeDocumentController {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private TypeDocumentRepository typeDocumentRepository;

    public TypeDocumentController(TypeDocumentRepository typeDocumentRepository) {
        this.typeDocumentRepository = typeDocumentRepository;
    }

//   исправить ниже лежащий код

    @GetMapping("/typeDocuments/")
    public List<TypeDocument> ListTypeDocument() {
        Iterable<TypeDocument> typeDocumentIterable = typeDocumentRepository.findAll();

        ArrayList<TypeDocument> typeDocuments = new ArrayList<>();
        for (TypeDocument typeDocument : typeDocumentIterable) {
            typeDocuments.add(typeDocument);
        }
        return typeDocuments;
    }

    @PostMapping("/typeDocuments/")
    @ResponseBody
    public int addTypeDocument(TypeDocument typeDocument) {
        if (typeDocumentRepository.count() == 0) {
            typeDocument.setId(1);
        }
        TypeDocument newTypeDocument = typeDocumentRepository.save(typeDocument);
        return newTypeDocument.getId();
    }

    // Проблема в получении объекта из базы данных, при вновь созданном объекте ошибка не выходит
    // надо получить объект из people
    @GetMapping("/documentsTables/typeDocuments/{id}")
    public ResponseEntity<?> getTypeDocument(@PathVariable int id) {
        Optional<TypeDocument> optionalTypeDocument = typeDocumentRepository.findById(id);
        if (!optionalTypeDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(optionalTypeDocument.get(), HttpStatus.OK);
    }

    @DeleteMapping("/typeDocuments/{id}")
    public ResponseEntity<?> dellTypeDocument(@PathVariable int id) {
        Optional<TypeDocument> optionalTypeDocument = typeDocumentRepository.findById(id);
        if (!optionalTypeDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        typeDocumentRepository.deleteById(id);
        return new ResponseEntity<>(typeDocumentRepository.count(), HttpStatus.OK);
    }

    @PutMapping("/typeDocuments/{id}")
    @ResponseBody
    public ResponseEntity<?> putTypeDocumentId(TypeDocument newTypeDocument, @PathVariable int id) {
        Optional<TypeDocument> optionalTypeDocument = typeDocumentRepository.findById(id);
        if (!optionalTypeDocument.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
       // нужен код перезаписи
        TypeDocument modifiedTypeDocument = newTypeDocument;
        typeDocumentRepository.save(modifiedTypeDocument);
        return new ResponseEntity<>(modifiedTypeDocument, HttpStatus.OK);
    }

    @DeleteMapping("/typeDocuments/")
    public ResponseEntity dellAllTypeDocuments() {
        if (typeDocumentRepository.count() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The list is already empty.");
        }
        typeDocumentRepository.deleteAll();
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
