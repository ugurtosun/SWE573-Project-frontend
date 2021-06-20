export class User {
    userID:string | undefined;
    userName:string;
    password:string;

    constructor(userName:string,password:string, userID:string){
        this.userName = userName;
        this.password = password;
        this.userID = userID;
    }
}

