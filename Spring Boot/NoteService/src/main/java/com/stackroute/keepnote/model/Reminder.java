package com.stackroute.keepnote.model;

import java.util.Date;

public class Reminder {
	
	/*
	 * This class should have six fields
	 * (reminderId,reminderName,reminderDescription,reminderType,
	 * reminderCreatedBy,reminderCreationDate).  This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of reminderCreationDate should not
	 * be accepted from the user but should be always initialized with the system
	 * date.
	 */
	String reminderId;
	String reminderName, reminderDescription, reminderType, reminderCreatedBy;
	Date reminderCreationDate;
	
	public Reminder() {

	}

	public Reminder(String Int, String string, String string1, String string2, String string3,
			Date date) {
		this.reminderId = Int;
		this.reminderName = string;
		this.reminderDescription = string1;
		this.reminderType = string2;
		this.reminderCreatedBy = string3;	
		this.reminderCreationDate = date;
		
	}

	public String getReminderId() {
		return this.reminderId;

	}

	public void setReminderId(String string) {
		this.reminderId = string;
	}

	public void setReminderName(String string) {
		this.reminderName = string;
	}

	public String getReminderDescription() {
		return this.reminderDescription;
	}

	public void setReminderDescription(String string) {
		this.reminderDescription = string;
	}

	public void setReminderType(String string) {
		this.reminderType = string;
	}

	public void setReminderCreationDate(Date date) {
		this.reminderCreationDate = date;
	}

	public void setReminderCreatedBy(String string) {
		this.reminderCreatedBy = string;
	}

	public String getReminderName() {
		return reminderName;
	}

	public String getReminderType() {
		return reminderType;
	}

	public String getReminderCreatedBy() {
		return reminderCreatedBy;
	}

	public Date getReminderCreationDate() {
		return reminderCreationDate;
	}

	@Override
	public String toString() {
		return "Reminder [reminderId=" + reminderId + ", reminderName=" + reminderName + ", reminderDescription="
				+ reminderDescription + ", reminderType=" + reminderType + ", reminderCreatedBy=" + reminderCreatedBy
				+ ", reminderCreationDate=" + reminderCreationDate + "]";
	}
	

}