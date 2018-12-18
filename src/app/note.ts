import { Category } from "./category";
import { Reminder } from "./reminder";

export class Note {

  // id: Number;
  // title: string;
  // text: string;
  // state: string;
  // creationDate: Date;
  // category: Category;
  // reminders: Reminder[];
  // createdBy: string;

  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreationDate: Date;
  category: Category;
  reminders: Reminder[];
  noteCreatedBy: string;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
    this.noteCreationDate = null;
    this.category = null;
    this.reminders = [];
  }
}
