package main;

import main.model.Document;
import main.model.People;
import main.model.TypeDocument;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class Storage {

    private static int currentId = 1;
    private static int currentDocId = 1;
    private static int currentTypeDocId = 1;
    private static final ConcurrentHashMap<Integer, People> peoples = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<Integer, Document> documents = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<Integer, TypeDocument> typeDocuments = new ConcurrentHashMap<>();

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

    public static List<TypeDocument> getAllTypeDocument() {
        ArrayList<TypeDocument> documentsList = new ArrayList<>();
        documentsList.addAll(typeDocuments.values());
        return documentsList;
    }

    public static int addPeople(People people) {
        int id = currentId++;
        people.setId(id);
        peoples.put(id, people);
        return id;
    }

    public static int addDocument(Document document) {
        int id = currentDocId++;
        document.setId(id);
        documents.put(id, document);
        return id;
    }

    public static int addTypeDocument(TypeDocument typeDocument) {
        int id = currentTypeDocId++;
        typeDocument.setId(id);
        typeDocuments.put(id, typeDocument);
        return id;
    }

    public static int setPeople(People people) {
        int idPeople = people.getId();
        peoples.put(idPeople, people);
        return idPeople;
    }

    public static int setDocument(Document document) {
        int idDocument = document.getId();
        documents.put(idDocument, document);
        return idDocument;
    }

    public static int setTypeDocument(TypeDocument typeDocument) {
        int idTypeDocument = typeDocument.getId();
        typeDocuments.put(idTypeDocument, typeDocument);
        return idTypeDocument;
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

    public static Document getDocumentForPeople(int peopleId) {
        if (documents.containsKey(peopleId)) {
            return documents.get(peopleId);
        }
        return null;
    }

    public static TypeDocument getTypeDocument(int typeDocumentId) {
        if (typeDocuments.containsKey(typeDocumentId)) {
            return typeDocuments.get(typeDocumentId);
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

    public static int dellTypeDocument(int typeDocumentId) {
        if (typeDocuments.containsKey(typeDocumentId)) {
            typeDocuments.remove(typeDocumentId);
            return typeDocumentId;
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

    public static int dellAllTypeDocument() {
        typeDocuments.clear();
        currentTypeDocId = 1;
        return 0;
    }
}