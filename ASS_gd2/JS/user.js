"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var url = "http://localhost:3000/";
class User {
    constructor(id, name, phone, pass, role) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.pass = pass;
        this.role = role;
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(url + "users");
            let data = yield res.json();
            console.log(data);
        });
    }
    form_DN() {
        let div = document.createElement("div");
        div.classList.add("content");
        div.innerHTML = `
        <h2>Đăng Nhập</h2>
        <form action="">
            <div>
                <label for=""> Tên Tài Khoản </label>
                <input type="text" name="name" id="name">
            </div>
            <div>
                <label for=""> Mật Khẩu</label>
                <input type="text" name="pass" id="pass">
            </div>
            <button type="submit" onclick="logIn">Đăng Nhập</button>
        </form>
    
        <a href="#">Đăng Ký</a>
        `;
        let content = document.querySelector("#content");
        console.log(div);
        content.appendChild(div);
    }
}
const user1 = new User(null, "", "", "", "");
user1.getUser();
user1.form_DN();
