
export type Users = {
    id : null ,
    name : string ,
    phone : string ,
    pass : string ,
    role : string 
}

export default class UserModel {

    id : null ;
    name : string ;
    phone : string ;
    pass : string ;
    role : string ;
    url: string

    constructor( url: string , id : null ,name : string , phone : string ,pass : string ,role : string ){
        this.id = id
        this.name = name
        this.phone = phone 
        this.pass = pass
        this.role = role
        this.url = url
    }

    async getUser() {
        let res = await fetch(this.url + "users");
        let data = await res.json() as Users[]
        console.log(data)
    }
    
    async addUser(newUser : any) {
        const response = await fetch(this.url + "users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
    
        return response.ok
    }

    async updateUser(id: string| null , update : any) {
 
        const response = await fetch(this.url + "users/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        });
        
        return response.ok
    }
}