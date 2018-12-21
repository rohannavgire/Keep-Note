export class User{
    userId : string;
    userPassword : string;
    firstName : string;
    lastName : string;
    userRole : string;
    userAddedDate : Date;

    constructor() {
        this.userId = '';
        this.userPassword = '';
        this.firstName = '';
        this.lastName = '';
        this.userRole = '';
        this.userAddedDate = null;
      }
}