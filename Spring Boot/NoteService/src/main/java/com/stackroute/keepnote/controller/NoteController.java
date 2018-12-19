package com.stackroute.keepnote.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.NoteAlreadyExistsException;
import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@Api
@RestController
@CrossOrigin(origins="*")
public class NoteController {

	/*
	 * Autowiring should be implemented for the NoteService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */
	NoteService noteService;

	@Autowired
	public NoteController(NoteService noteService) {
		super();
		this.noteService = noteService;
	}

	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 201(CREATED) - If the note created successfully. 
	 * 2. 409(CONFLICT) - If the noteId conflicts with any existing user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST method
	 */
	@ApiOperation(value = "Creates a new Note.")
	@PostMapping(value = "/api/v1/note")
	public ResponseEntity<Note> createNote(@RequestBody Note note) {
		System.out.println("YAY Note tba: "+note);
			if(noteService.createNote(note))
				return new ResponseEntity<Note>(note, HttpStatus.CREATED);
			else
				return new ResponseEntity<Note>(HttpStatus.CONFLICT);
      	
	}

	/*
	 * Define a handler method which will delete a note from a database.
	 * This handler method should return any one of the status messages basis 
	 * on different situations: 
	 * 1. 200(OK) - If the note deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid noteId without {}
	 */
	@ApiOperation(value = "Deletes a Note.")
	@DeleteMapping(value = "/api/v1/note/{userId}/{id}")
	public ResponseEntity<Note> deleteNote(@PathVariable("userId") String userId, @PathVariable("id") int noteId) {
		/*String loggedInUserId = (String) session.getAttribute("loggedInUserId");
		
		if(loggedInUserId==null) {
			return new ResponseEntity<Note>(HttpStatus.UNAUTHORIZED);
		}*/
		
		if(!noteService.deleteNote(userId, noteId)) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}					
			
		return new ResponseEntity<Note>(HttpStatus.OK);
	}
	
	/*
	 * Delete all notes.
	 */
	@ApiOperation(value = "Deletes all Notes.")
	@DeleteMapping(value = "/api/v1/note/{userId}")
	public ResponseEntity<Note> deleteAllNotes(@PathVariable("userId") String userId) {		
		
		try {
			if(!noteService.deleteAllNotes(userId)) {
				return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
			}
		} catch (NoteNotFoundExeption e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}					
			
		return new ResponseEntity<Note>(HttpStatus.OK);
	}

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in a
	 * database. 
	 * This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the note updated successfully.
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP PUT method.
	 */
	@ApiOperation(value = "Updates a Note.")
	@PutMapping(value = "/api/v1/note/{userId}/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable("userId") String userId, @PathVariable("id") int noteId, @RequestBody Note note) throws Exception {
		System.out.println("YAY INSIDE NOTEE!!!!!!!!!");

		note.setNoteTitle(note.getNoteTitle());
		note.setNoteContent(note.getNoteContent());
		note.setNoteStatus(note.getNoteStatus());
		note.setNoteCreatedBy(note.getNoteCreatedBy());
		note.setCategory(note.getCategory());
		System.out.println("YAY updated note rem1: "+note.getReminders());
		note.setReminders(note.getReminders());
		System.out.println("YAY updated note rem2: "+note.getReminders());
		note.setNoteCreationDate(note.getNoteCreationDate());		

		Note updatedNote = null;
		try {
			updatedNote = noteService.updateNote(note, noteId, userId);
		}
		catch(NoteNotFoundExeption e) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		if (updatedNote == null) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Note>(note, HttpStatus.OK);		

	}
	
	/*
	 * Define a handler method which will get us the all notes by a userId.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP GET method
	 */
	@ApiOperation(value = "Returns all Notes.")
	@GetMapping(value = "/api/v1/note/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Note>> getAllNotesByUserId(@PathVariable("userId") String userId) {
		/*String loggedInUserId = (String) session.getAttribute("loggedInUserId");

		if(loggedInUserId==null) {
			return new ResponseEntity<List<Note>>(HttpStatus.UNAUTHORIZED);
		}*/
		
		List<Note> notes = new ArrayList<Note>();

		notes = noteService.getAllNoteByUserId(userId);
		
		return new ResponseEntity<List<Note>>(notes, HttpStatus.OK);
	}
	
	/*
	 * Define a handler method which will show details of a specific note created by specific 
	 * user. This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 * 
	 */
	@ApiOperation(value = "Finds a Note by its ID.")
	@GetMapping(value = "/api/v1/note/{userId}/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Note> getNoteByNoteId(@PathVariable("userId") String userId, @PathVariable("id") int noteId) throws NoteNotFoundExeption {
		/*String loggedInUserId = (String) session.getAttribute("loggedInUserId");

		if(loggedInUserId==null) {
			return new ResponseEntity<List<Note>>(HttpStatus.UNAUTHORIZED);
		}*/
		Note note;
		try {
			note = noteService.getNoteByNoteId(userId, noteId);
		} catch (NoteNotFoundExeption e) {
			e.printStackTrace();
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}	
		
		return new ResponseEntity<Note>(note, HttpStatus.OK);
	}

}