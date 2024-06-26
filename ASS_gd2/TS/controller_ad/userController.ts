import UserModel from "../model/userModel";
import { Users } from "../model/userModel";
import User_view from "../views/user_view";

export default class UserController {
    model : UserModel
    view : User_view

    constructor (model :UserModel , view: User_view){
        this.model = model 
        this.view = view 
    }

    async addUser(newUser: any) {

        const response = await this.model.addUser(newUser)

        

    }
}