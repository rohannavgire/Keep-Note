package com.stackroute.keepnote.model;

import java.util.Date;

public class Category {

	/*
	 * This class should have five fields
	 * (categoryId,categoryName,categoryDescription,
	 * categoryCreatedBy,categoryCreationDate). This class should also contain the
	 * getters and setters for the fields along with the toString method. The value
	 * of categoryCreationDate should not be accepted from the user but should be
	 * always initialized with the system date.
	 */
	String categoryId;
	String categoryName, categoryDescription, categoryCreatedBy;
	Date categoryCreationDate;
	
	public Category() {

	}

	public Category(String categoryId, String categoryName, String categoryDescription, String categoryCreatedBy,
			Date categoryCreationDate) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
		this.categoryCreatedBy = categoryCreatedBy;
		this.categoryCreationDate = categoryCreationDate;
	}

	public void setCategoryId(String string) {
		this.categoryId = string;
	}

	public String getCategoryId() {
		return this.categoryId;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String string) {
		this.categoryName = string;
	}

	public String getCategoryDescription() {
		return this.categoryDescription;
	}

	public void setCategoryDescription(String string) {
		this.categoryDescription = string;
	}

	public void setCategoryCreationDate(Date date) {
		this.categoryCreationDate = date;
	}

	public void setCategoryCreatedBy(String string) {
		this.categoryCreatedBy = string;
	}

	public String getCategoryCreatedBy() {
		return categoryCreatedBy;
	}

	public Date getCategoryCreationDate() {
		return categoryCreationDate;
	}

	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", categoryName=" + categoryName + ", categoryDescription="
				+ categoryDescription + ", categoryCreatedBy=" + categoryCreatedBy + ", categoryCreationDate="
				+ categoryCreationDate + "]";
	}


}