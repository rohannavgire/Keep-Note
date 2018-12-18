export class Reminder {
    reminderId: string;
    reminderName: string;
    reminderDescription: string;
    reminderType: string;
    reminderCreatedBy: string;
    reminderCreationDate: Date;
  
    constructor() {
      this.reminderId = '';
      this.reminderName = '';
      this.reminderDescription = '';
      this.reminderType = '';
      this.reminderCreatedBy = '';
      this.reminderCreationDate = null;
    }
  }
  