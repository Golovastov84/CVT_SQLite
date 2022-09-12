package main;

import main.model.Document;
import main.model.People;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Storage {

    private static int currentId = 1;
    private static int currentDocId = 1;
    private static final ConcurrentHashMap<Integer, People> peoples = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<Integer, Document> documents = new ConcurrentHashMap<>();

    public static List<People> getAllPeoples() {
        ArrayList<People> peoplesList = new ArrayList<>();
        peoplesList.addAll(peoples.values());
        return peoplesList;
    }

    public static List<Document> getAllDocuments() {
        ArrayList<Document> documentsList = new ArrayList<>();
        documentsList.addAll(documents.values());
        return documentsList;
    }

    public static int addPeople(People people) {
        int id = currentId++;
        people.setId(id);
        peoples.put(id, people);
        return id;
    }


    public static int setDocument(Document document) {
        int IdDocument = document.getId();
        documents.put(IdDocument, document);
        return IdDocument;
    }

    public static People getPeople(int peopleId) {
        if (peoples.containsKey(peopleId)) {
            return peoples.get(peopleId);
        }
        return null;
    }

    public static Document getDocument(int documentId) {
        if (documents.containsKey(documentId)) {
            return documents.get(documentId);
        }
        return null;
    }

    public static int dellPeople(int peopleId) {
        if (peoples.containsKey(peopleId)) {
            peoples.remove(peopleId);
            return peopleId;
        }
        return 0;
    }

    public static int dellDocument(int documentId) {
        if (documents.containsKey(documentId)) {
            documents.remove(documentId);
            return documentId;
        }
        return 0;
    }

    public static int dellAllPeople() {
        peoples.clear();
        currentId = 1;
        return 0;
    }

    public static int dellAllDocument() {
        documents.clear();
        currentDocId = 1;
        return 0;
    }
}