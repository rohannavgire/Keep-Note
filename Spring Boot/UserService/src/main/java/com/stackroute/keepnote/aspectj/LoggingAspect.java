package com.stackroute.keepnote.aspectj;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


/* Annotate this class with @Aspect and @Component */

@Aspect
@Component
public class LoggingAspect {
	/*
	 * Write loggers for each of the methods of User controller, any particular
	 * method will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	private final static Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

	@Before("execution(* com.stackroute.keepnote.controller.UserController.getUser(..))")
	public void logBeforeGetUser(JoinPoint joinPoint) {

		logger.info("============@Before==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("*********************************");

	}

	@After("execution(* com.stackroute.keepnote.controller.UserController.getUser(..))")
	public void logAfterGetUser(JoinPoint joinPoint) {

		logger.info("============@After==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("*********************************");

	}

	@AfterReturning(pointcut = "execution(* com.stackroute.keepnote.controller.UserController.getUser(..))", returning = "result")
	public void logAfterReturningGetUser(JoinPoint joinPoint, Object result) {

		logger.debug("============@AfterReturning==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("*********************************");

	}

	@AfterThrowing(pointcut = "execution(* com.stackroute.keepnote.controller.UserController.getUser(..))", throwing = "error")
	public void logAfterThrowingGetUser(JoinPoint joinPoint, Throwable error) {

		logger.info("============@AfterThrowing==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("Exception : " + error);
		logger.debug("*********************************");
	}

	@Before("execution(* com.stackroute.keepnote.controller.UserController.updateUser(..))")
	public void logBeforeCreateUser(JoinPoint joinPoint) {

		logger.info("============@Before==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("*********************************");

	}

	@After("execution(* com.stackroute.keepnote.controller.UserController.updateUser(..))")
	public void logAfterCreateUser(JoinPoint joinPoint) {

		logger.info("============@After==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("*********************************");

	}

	@AfterReturning(pointcut = "execution(* com.stackroute.keepnote.controller.UserController.updateUser(..))", returning = "result")
	public void logAfterReturningCreateUser(JoinPoint joinPoint, Object result) {

		logger.debug("============@AfterReturning==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("*********************************");

	}

	@AfterThrowing(pointcut = "execution(* com.stackroute.keepnote.controller.UserController.updateUser(..))", throwing = "error")
	public void logAfterThrowingCreateUser(JoinPoint joinPoint, Throwable error) {

		logger.info("============@AfterThrowing==========");
		logger.debug("Method Name : " + joinPoint.getSignature().getName());
		logger.debug("Method arguments : " + Arrays.toString(joinPoint.getArgs()));
		logger.debug("Exception : " + error);
		logger.debug("*********************************");
	}
	
}