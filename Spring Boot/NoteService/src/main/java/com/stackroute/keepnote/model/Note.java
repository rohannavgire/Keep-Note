package com.stackroute.keepnote.model;

import java.util.Date;
import java.util.List;

public class Note {
	
	/*
	 * This class should have eight fields
	 * (noteId,noteTitle,noteContent,noteStatus,createdAt,
	 * category,reminder,createdBy). This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of createdAt should not be
	 * accepted from the user but should be always initialized with the system date.
	 * 
	 */
	int noteId;
	String noteTitle, noteContent, noteStatus;
	Date noteCreationDate;
	Category category;
	List<Reminder> reminders;
	String noteCreatedBy;
	
	public Note() {

	}

	public Note(int Int, String string, String string1, String string2, Date date, Category category, List<Reminder> reminders,
			String string3) {
		this.noteId = Int;
		this.noteTitle = string;
		this.noteContent = string1;
		this.noteStatus = string2;
		this.noteCreationDate = date;
		this.category = category;
		this.reminders = reminders;
		this.noteCreatedBy = string3;
	}


	    // getters & setters

	public int getNoteId() {
		return this.noteId;
	}

	public void setNoteId(int Int) {
		this.noteId = Int;
	}

	public String getNoteTitle() {
		return this.noteTitle;
	}

	public void setNoteTitle(String string) {
		this.noteTitle = string;
	}

	public String getNoteContent() {
		return this.noteContent;
	}

	public void setNoteContent(String string) {
		this.noteContent = string;
	}

	public void setNoteStatus(String string) {
		this.noteStatus = string;
	}

	public void setNoteCreationDate(Date date) {
		this.noteCreationDate = date;
	}

	public void setNoteCreatedBy(String string) {
		this.noteCreatedBy = string;
	}

/*	public void setReminder(Reminder reminder) {
		this.reminder = reminder;
	}*/

	public void setCategory(Category category) {
		this.category = category;
	}

	public Date getNoteCreationDate() {
		return noteCreationDate;
	}

	public String getNoteStatus() {
		return noteStatus;
	}

	public Category getCategory() {
		return category;
	}

/*	public Reminder getReminder() {
		return reminder;
	}*/

	public String getNoteCreatedBy() {
		return noteCreatedBy;
	}


	    public List<Reminder> getReminders() {
	        return reminders;
	    }

	    public void setReminders(List<Reminder> reminders) {
	    	this.reminders = reminders;
	    }

		@Override
		public String toString() {
			return "Note [noteId=" + noteId + ", noteTitle=" + noteTitle + ", noteContent=" + noteContent
					+ ", noteStatus=" + noteStatus + ", createdAt=" + noteCreationDate + ", category=" + category
					+ ", reminders=" + reminders + ", createdBy=" + noteCreatedBy + "]";
		}
	    
	    
	
}