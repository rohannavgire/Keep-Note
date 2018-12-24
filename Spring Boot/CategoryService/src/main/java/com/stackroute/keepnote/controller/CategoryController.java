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

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;

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
public class CategoryController {

	/*
	 * Autowiring should be implemented for the CategoryService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	CategoryService categoryService;

	@Autowired
	public CategoryController(CategoryService categoryService) {
		super();
		this.categoryService = categoryService;
	}
	
	@GetMapping(value = "/")
	public String first() {
		return "Welcome to Category!";
	}

	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */
	@ApiOperation(value = "Creates a new Category.")
	@PostMapping(value = "/api/v1/category")
	public ResponseEntity<Category> createCategory(@RequestBody Category category) {

				try {     
                    Category category1 = categoryService.createCategory(category);
                    return new ResponseEntity<Category>(category1, HttpStatus.CREATED);
        
                } catch (CategoryNotCreatedException e) {
                    return new ResponseEntity<Category>(HttpStatus.CONFLICT);
                        
                }
	}
	
	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid categoryId without {}
	 */
	@ApiOperation(value = "Deletes a Category.")
	@DeleteMapping(value = "/api/v1/category/{id}")
	public ResponseEntity<Category> deleteCategory(@PathVariable("id") String categoryId) {
		System.out.println("YAY cat TBDDD: "+ categoryId);
		try {
			System.out.println("YAY cat tbd: "+ categoryId);
			if(!categoryService.deleteCategory(categoryId)) {
				return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
			}
		} catch (CategoryDoesNoteExistsException e) {
			e.printStackTrace();
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}					
			
		return new ResponseEntity<Category>(HttpStatus.OK);
	}

	
	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP PUT
	 * method.
	 */
	@ApiOperation(value = "Updates a Category.")
	@PutMapping(value = "/api/v1/category/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable("id") String categoryId, @RequestBody Category category) {
	
		Category updatedCategory;

			updatedCategory = categoryService.updateCategory(category, categoryId);
		
		if (updatedCategory == null) {
			return new ResponseEntity<Category>(HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<Category>(updatedCategory, HttpStatus.OK);

	}
	
	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully. 
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET method
	 */
	@ApiOperation(value = "Finds all Categories for a User ID.")
	@GetMapping(value = "/api/v1/category/all/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Category>> getCategoryByUserId(@PathVariable("userId") String userId) {

		List<Category> category = null;

				category = categoryService.getAllCategoryByUserId(userId);			
			
			if(category.isEmpty())
				return new ResponseEntity<List<Category>>(category, HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<List<Category>>(category, HttpStatus.OK);
	}

	/*
	 * Define a handler method which will get us the category by a categoryId.
	 */
	@ApiOperation(value = "Finds a Category by its ID.")
	@GetMapping(value = "/api/v1/category/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Category> getCategoryById(@PathVariable("id") String categoryId) {

		Category category = null;


				try {
					category = categoryService.getCategoryById(categoryId);
				} catch (CategoryNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
				}
			
			
			if(category == null)
				return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}


}