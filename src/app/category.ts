export class Category {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categoryCreatedBy: string;
  categoryCreationDate: Date;

  constructor() {
    this.id = '';
    this.categoryId = '';
    this.categoryName = '';
    this.categoryDescription = '';
    this.categoryCreatedBy = '';
    this.categoryCreationDate = null;
  }
}
