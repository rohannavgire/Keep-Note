package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserAutheticationRepository;

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
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

    /*
	 * Autowiring should be implemented for the UserAuthenticationRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	UserAutheticationRepository userAuthRepo;

	@Autowired
     public UserAuthenticationServiceImpl(UserAutheticationRepository userAuthRepo) {
		super();
		this.userAuthRepo = userAuthRepo;
	}


	/*
	 * This method should be used to validate a user using userId and password.
	 *  Call the corresponding method of Respository interface.
	 * 
	 */
    @Override
    public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {

    	if(userAuthRepo.findById(userId) == null)
    		throw (new UserNotFoundException("User not found."));
    	
    	User user = userAuthRepo.findByUserIdAndUserPassword(userId, password);
    	
    	return user;
    }




	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

    @Override
    public boolean saveUser(User user) throws UserAlreadyExistsException {
       
    	/*if(userAuthRepo.findById(user.getUserId()) != null)
    		throw (new UserAlreadyExistsException("User already exists."));
    	else
    		throw (new UserAlreadyExistsException("User already exists."));
    	
    	user = userAuthRepo.save(user);
    	
    	if(user == null)
    		return false;
    	else
    		return true;*/
    	
    	Optional<User> u1 = userAuthRepo.findById(user.getUserId());
        if (u1.isPresent()) {
            throw new UserAlreadyExistsException("User with Id already exists");
        }
        user.setUserAddedDate(new Date());
        userAuthRepo.save(user);
        return true;
    }
}
