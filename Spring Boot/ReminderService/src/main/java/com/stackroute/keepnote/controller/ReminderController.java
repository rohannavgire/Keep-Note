package com.stackroute.keepnote.controller;

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

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;

import com.stackroute.keepnote.service.ReminderService;

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
public class ReminderController {

	/*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 
	 * 2. Delete a reminder 
	 * 3. Update a reminder 
	 * 4. Get all reminders by userId 
	 * 5. Get a specific reminder by id.
	 * 
	 */

	/*
	 * Autowiring should be implemented for the ReminderService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	ReminderService reminderService;

	@Autowired
	public ReminderController(ReminderService reminderService) {
		this.reminderService = reminderService;
	}
	
	@GetMapping(value = "/")
	public String first() {
		return "Welcome to Reminder!";
	}

	/*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 
	 * 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP POST
	 * method".
	 */
	@ApiOperation(value = "Creates a new Reminder.")
	@PostMapping(value = "/api/v1/reminder")
	public ResponseEntity<Reminder> createReminder(@RequestBody Reminder reminder) {

				try {
					if(reminderService.getReminderById(reminder.getReminderId()) == null) {
						reminder = reminderService.createReminder(reminder);
						return new ResponseEntity<Reminder>(reminder, HttpStatus.CREATED);
					}
					else
						return new ResponseEntity<Reminder>(HttpStatus.CONFLICT);
				} catch (ReminderNotFoundException | ReminderNotCreatedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					if(e instanceof ReminderNotFoundException) {
						try {
							reminder = reminderService.createReminder(reminder);
						} catch (ReminderNotCreatedException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
							return new ResponseEntity<Reminder>(HttpStatus.CONFLICT);
						}
						return new ResponseEntity<Reminder>(reminder, HttpStatus.CREATED);
					}
					e.printStackTrace();									
					return new ResponseEntity<Reminder>(HttpStatus.CONFLICT);
						
				}	
				
	}

	/*
	 * Define a handler method which will delete a reminder from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value = "Deletes a Reminder.")
	@DeleteMapping(value = "/api/v1/reminder/{id}")
	public ResponseEntity<Reminder> deleteReminder(@PathVariable("id") String reminderId) {
		
		try {
			if(!reminderService.deleteReminder(reminderId)) {
				return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
			}
		} catch (ReminderNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
		}					
			
		return new ResponseEntity<Reminder>(HttpStatus.OK);
	}

	/*
	 * Define a handler method which will update a specific reminder by reading the
	 * Serialized object from request body and save the updated reminder details in
	 * a database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the reminder updated successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP PUT
	 * method.
	 */
	@ApiOperation(value = "Updates a Reminder.")
	@PutMapping(value = "/api/v1/reminder/{id}")
	public ResponseEntity<Reminder> updateReminder(@PathVariable("id") String reminderId, @RequestBody Reminder reminder) {
	
		reminder.setReminderName(reminder.getReminderName());
		reminder.setReminderDescription(reminder.getReminderDescription());
		reminder.setReminderType(reminder.getReminderType());
		reminder.setReminderCreatedBy(reminder.getReminderCreatedBy());
		reminder.setReminderCreationDate(reminder.getReminderCreationDate());
				

		Reminder updatedReminder;
		try {
			updatedReminder = reminderService.updateReminder(reminder, reminderId);
		} catch (ReminderNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
		}
		if (updatedReminder == null) {
			return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Reminder>(updatedReminder, HttpStatus.OK);		

	}

	/*
	 * Define a handler method which will show details of a specific reminder. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value = "Finds a Reminder by its ID.")
	@GetMapping(value = "/api/v1/reminder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Reminder> getReminderByReminderId(@PathVariable("id") String reminderId) {

		Reminder reminder = null;

			try {
				reminder = reminderService.getReminderById(reminderId);
			} catch (ReminderNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
			}
			
			if(reminder == null)
				return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<Reminder>(reminder, HttpStatus.OK);
	}
	
	@ApiOperation(value = "Finds all Reminders for a User ID.")
	@GetMapping(value = "/api/v1/reminder/all/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Reminder>> getRemindersByUserId(@PathVariable("userId") String userId) {

		List<Reminder> reminders = null;

		reminders = reminderService.getAllRemindersByUserId(userId);		
			
			if(reminders.isEmpty())
				return new ResponseEntity<List<Reminder>>(reminders, HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<List<Reminder>>(reminders, HttpStatus.OK);
	}

	/*
	 * Define a handler method which will get us the all reminders.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP GET method
	 */
	@ApiOperation(value = "Returns all Reminders.")
	@GetMapping(value = "/api/v1/reminder", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Reminder>> getAllReminders() {

		List<Reminder> reminders;

			reminders = reminderService.getAllReminders();
			
			if(reminders.isEmpty())
				return new ResponseEntity<List<Reminder>>(HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<List<Reminder>>(reminders, HttpStatus.OK);
	}
}