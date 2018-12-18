package com.stackroute.keepnote.controller;

import javax.servlet.http.HttpSession;

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

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@Api
@CrossOrigin(origins="*")
public class UserController {

	/*
	 * Autowiring should be implemented for the UserService. (Use Constructor-based
	 * autowiring) Please note that we should not create an object using the new
	 * keyword
	 */
	UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping(value = "/")
	public String first() {
		return "Welcome to Rohan!";
	}
	
	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations:
	 * 1. 201(CREATED) - If the user created successfully. 
	 * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	 * 
	 * This handler method should map to the URL "/user" using HTTP POST method
	 */	
	@ApiOperation(value = "Creates a new User.")
	@PostMapping(value = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> createUser(@RequestBody User user) throws UserNotFoundException {
				try {
					if(userService.getUserById(user.getUserId()) == null) {
						user = userService.registerUser(user);
						return new ResponseEntity<User>(user, HttpStatus.CREATED);
					}
					else
						return new ResponseEntity<User>(HttpStatus.CONFLICT);
				} catch (UserNotFoundException | UserAlreadyExistsException e) {
					// TODO Auto-generated catch block
					if(e instanceof UserNotFoundException) {
						try {
							user = userService.registerUser(user);
						} catch (UserAlreadyExistsException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
							return new ResponseEntity<User>(HttpStatus.CONFLICT);
						}
						return new ResponseEntity<User>(user, HttpStatus.CREATED);
					}
					e.printStackTrace();									
					return new ResponseEntity<User>(HttpStatus.CONFLICT);
						
				}
	}

	/*
	 * Define a handler method which will update a specific user by reading the
	 * Serialized object from request body and save the updated user details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the user updated successfully.
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP PUT method.
	 */
	@ApiOperation(value = "Updates a User.")
	@PutMapping(value = "/api/v1/user/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") String userId, @RequestBody User user, HttpSession session) throws Exception {

		user.setUserName(user.getUserName());
		user.setUserPassword(user.getUserPassword());
		user.setUserMobile(user.getUserMobile());

		User updatedUser = null;
		try {
			updatedUser = userService.updateUser(userId, user);
		}
		catch(UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		if (updatedUser == null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<User>(user, HttpStatus.OK);		

	}

	/*
	 * Define a handler method which will delete a user from a database.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid userId without {}
	 */
	@ApiOperation(value = "Deletes a User.")
	@DeleteMapping(value = "/api/v1/user/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable("id") String userId, HttpSession session) throws UserNotFoundException {
		
		try {
		if(!userService.deleteUser(userId)) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		}
		catch(UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
			
		return new ResponseEntity<User>(HttpStatus.OK);
	}

	/*
	 * Define a handler method which will show details of a specific user. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user found successfully. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP GET method where "id" should be
	 * replaced by a valid userId without {}
	 */
	@ApiOperation(value = "Returns a User.")
	@GetMapping(value = "/api/v1/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUser(@PathVariable("id") String username,HttpSession session) throws UserNotFoundException {
		
		User user = null;
	try {		
		user = userService.getUserById(username);
	}
	catch(UserNotFoundException e) {
		return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	}

		if (user == null) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}