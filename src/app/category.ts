export class Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categoryCreatedBy: string;
  categoryCreationDate: Date;

  constructor() {
    this.categoryId = '';
    this.categoryName = '';
    this.categoryDescription = '';
    this.categoryCreatedBy = '';
    this.categoryCreationDate = null;
  }
}
