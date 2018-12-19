export class Reminder {
    id: string;
    reminderName: string;
    reminderDescription: string;
    reminderType: string;
    reminderCreatedBy: string;
    reminderCreationDate: Date;
  
    constructor() {
      this.id = '';
      this.reminderName = '';
      this.reminderDescription = '';
      this.reminderType = '';
      this.reminderCreatedBy = '';
      this.reminderCreationDate = null;
    }
  }
  