export class UserModel {
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate:Date


    ) {}
    // Acces the token as user.token and why getter is because u cant set it like
    // user.token = "aasasas+" // this would throw an error 
    
    get token (){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
             return null
         }
         return this._token
    }    
    
}