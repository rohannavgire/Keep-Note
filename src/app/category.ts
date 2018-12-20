export class Category {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryCreatedBy: string;
  categoryCreationDate: Date;

  constructor() {
    this.id = '';
    this.categoryName = '';
    this.categoryDescription = '';
    this.categoryCreatedBy = '';
    this.categoryCreationDate = null;
  }
}
