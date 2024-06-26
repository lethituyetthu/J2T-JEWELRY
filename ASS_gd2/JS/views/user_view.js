import UserModel from "../model/userModel.js";
export default class User_view {
    constructor(url) {
        this.url = url;
        this.model = new UserModel(url, null, "", " ", "", "");
    }
    form_dn() {
        let div = document.createElement("div");
        div.classList.add("modal-content");
        div.innerHTML = `
        <a href="index.html" class="close">&times;</a>
        <h2>Đăng Nhập</h2>
        <form action="" method= "post" id="loginForm">
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
    
        <a href="?ctrl=register">Đăng Ký</a>
        `;
        let content = document.getElementById("modal");
        console.log(div);
        content.appendChild(div);
        const close = div.querySelector('.close');
        close === null || close === void 0 ? void 0 : close.addEventListener('click', () => {
            div.remove();
        });
        const formLogin = div.querySelector("#loginForm");
        formLogin === null || formLogin === void 0 ? void 0 : formLogin.addEventListener('submit', (event) => {
            event.preventDefault();
            const userName = document.getElementById('name').value;
            const password = document.getElementById('pass').value;
        });
    }
    form_dk() {
        let div = document.createElement("div");
        div.classList.add("modal-content");
        div.innerHTML = `
        <a href="index.html" class="close">&times;</a>
        <h2>Đăng Ký</h2>
        <form action="" method= "post">
            <div>
                <label for=""> Tên Tài Khoản </label>
                <input type="text" name="name" id="name">
            </div>
            <div>
                <label for=""> Mật Khẩu</label>
                <input type="text" name="pass" id="pass">
            </div>
            <div>
                <label for=""> Số Điện Thoại</label>
                <input type="text" name="phone" id="phone">
            </div>
            <div>
                <label for="">Email</label>
                <input type="text" name="mail" id="mail">
            </div>
           
            <button type="submit" onclick="logIn">Đăng Ký</button>
        </form>
    
        <a href="?ctrl=login">Đăng Ký</a>
        `;
        let content = document.getElementById("modal");
        console.log(div);
        content.appendChild(div);
        const close = div.querySelector('.close');
        close === null || close === void 0 ? void 0 : close.addEventListener('click', () => {
            div.remove();
        });
    }
}
