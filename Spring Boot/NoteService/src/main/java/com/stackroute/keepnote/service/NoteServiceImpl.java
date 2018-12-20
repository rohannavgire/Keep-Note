package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class NoteServiceImpl implements NoteService{

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	NoteRepository noteRepository;
	MongoOperations mongoOperation;
	
	
	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository, MongoOperations mongoOperation) {
		this.noteRepository = noteRepository;
		this.mongoOperation = mongoOperation;
	}

	/*
	 * This method should be used to save a new note.
	 */
	public Boolean createNote(Note note) {		
				
		NoteUser noteUser1 = null;
		note.setNoteCreationDate(new Date());
		try {
			noteUser1 = noteRepository.findById(note.getNoteCreatedBy()).get();
		}
		catch(NoSuchElementException e) {
			noteUser1 = new NoteUser();
			noteUser1.setUserId(note.getNoteCreatedBy());
			List<Note> notes = new ArrayList<Note>();
			note.setNoteId(1);
			notes.add(note);
			noteUser1.setNotes(notes);
			return true;
		}
		List<Note> notes = noteUser1.getNotes();
		int totalNotes = notes.size();
		for(Note found: notes) {
			if(found.getNoteId() == note.getNoteId()) {
				return false;
			}
		}
		note.setNoteId(totalNotes+1);
		notes.add(note);
		noteUser1.setNotes(notes);
		
			int flag = 0;
			noteRepository.save(noteUser1);
			for(Note newNote: noteRepository.findById(note.getNoteCreatedBy()).get().getNotes()) {
				if(newNote.getNoteId() == note.getNoteId())
					flag = 1;
			}
			
        if(flag == 1)
            return true;
        else
        	return false;

	}
	/*public Boolean createNote(Note note) {      
        NoteUser noteUser = new NoteUser();
        List<Note> noteList = new ArrayList<>();
        note.setNoteCreationDate(new Date());
        noteList.add(note);
        noteUser.setUserId(note.getNoteCreatedBy());
        noteUser.setNotes(noteList);
        NoteUser n = noteRepository.insert(noteUser);
        if(n == null) {
            return false;
        } else {
            return true;
        }
    }*/
	
	/* This method should be used to delete an existing note. */

	
	public boolean deleteNote(String userId, int noteId) {
		NoteUser noteUser = noteRepository.findById(userId).get();
		List<Note> notes = noteUser.getNotes();
		int flag = 0;
		for(Note note: notes) {
			if(note.getNoteId() == noteId) {
				notes.remove(note);
				flag = 1;
				break;
			}
		}	
		if(flag == 0)
			return false;
		noteUser.setNotes(notes);
		if(noteRepository.save(noteUser) != null)
			return true;
		else
			return false;
	}
	
	/* This method should be used to delete all notes with specific userId. */

	
	public boolean deleteAllNotes(String userId) {
		NoteUser noteUser = noteRepository.findById(userId).get();
		List<Note> notes = noteUser.getNotes();
		if(notes.size() == 0)
			return false;
		notes.removeAll(notes);
		noteUser.setNotes(notes);
		if(noteRepository.save(noteUser) != null)
			return true;
		else
			return false;
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		NoteUser noteUser = null;
		try {		
			noteUser = noteRepository.findById(userId).get();
		}
		catch (NoSuchElementException e) {
			throw(new NoteNotFoundExeption("Note not found."));
		}
		List<Note> notes = noteUser.getNotes();
		Integer index = null;
		for(Note found: notes) {
			if(found.getNoteId() == id) {
				index = notes.indexOf(found);
			}
		}
		if(index == null)
			throw(new NoteNotFoundExeption("Note not found."));
		Note updated = notes.set(index, note);
		noteUser.setNotes(notes);
		noteRepository.save(noteUser);
		
		if(updated != null)
			return updated;
		else
			throw(new NoteNotFoundExeption("Note not found."));
	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		
		NoteUser noteUser = null;
		try {
			noteUser = noteRepository.findById(userId).get();
		}
		catch(NoSuchElementException e) {
			throw(new NoteNotFoundExeption("Note not found."));
		}
		List<Note> notes = noteUser.getNotes();		
		for(Note note: notes) {
			if(note.getNoteId() == noteId)
				return note;
		}
		
		throw(new NoteNotFoundExeption("Note not found."));
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		NoteUser noteUser = null;
		try {
			noteUser = noteRepository.findById(userId).get();
		}
		catch(NoSuchElementException e) {
			List<Note> notes = Collections.<Note>emptyList();
			return notes;
		}
		List<Note> notes = noteUser.getNotes();
		
		return notes;
	}

}