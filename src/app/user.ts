export class User {
    userID:string | undefined;
    emailAddress:string;
    userName:string;
    password:string;

    constructor(emailAddress:string,userName:string,password:string, userID:string){
        this.emailAddress = emailAddress;
        this.userName = userName;
        this.password = password;
        this.userID = userID;
    }
}

