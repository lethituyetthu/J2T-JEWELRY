var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class UserModel {
    constructor(url, id, name, phone, pass, role) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.pass = pass;
        this.role = role;
        this.url = url;
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.url + "users");
            let data = yield res.json();
            console.log(data);
        });
    }
    addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            return response.ok;
        });
    }
    updateUser(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "users/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            });
            return response.ok;
        });
    }
}
