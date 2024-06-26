import { Categories } from '../model/categoryModel.js'
import CategoryModel from '../model/categoryModel.js';

export default class CategoryView {
    private model: CategoryModel;
    url: string
    constructor(url : string) {
        this.url = url
        this.model = new CategoryModel(url, null, "", "")
    }

    // show danh sách 
    showCate(data: Categories[]) {

        let table = ` 
             
        
        `
        let content = document.querySelector(".content") as HTMLElement
        content.innerHTML = table


        let listCate = document.getElementById("list-cate") as HTMLElement


        data.forEach(el => {
            let kq = document.createElement("tr");
            kq.innerHTML= `
            <td>${el.id}</td>
            <td class="sp"> <img src="${el.img}" alt="${el.name}" width ="100px"> <p>${el.name}</p></td>

            <td>
                <a href="?ctrl=cate&act=delete&id=${el.id}"">Xóa</a> 
                <a href="?ctrl=cate&act=update&id=${el.id}" >Sửa</a>
            </td>
        
            `;
            listCate.appendChild(kq)

        })


    }

    
    // load form thêm 

    loadForm() {
        let formAdd = document.getElementById("form_add") as HTMLElement

        formAdd.innerHTML = `
         <form action="" method="post">
    
         <div>
             Tên Danh Mục:
             <input type="text" id="txt_name">
    
         </div>
         <div>
             IMG:
             <input type="text" id="txt_img">
    
         </div>
         <button type="submit" id="add-btn">Add</button>
    
    
     </form> 
        `

        const form = formAdd.querySelector("form") as HTMLFormElement

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = (document.getElementById('txt_name') as HTMLInputElement).value;
            const img = (document.getElementById('txt_img') as HTMLInputElement).value;

            if (name === '' || img === '') {
                alert("Nhập Đầy Đủ Thông Tin Danh Mục")
                return
            }
            console.log(name, img)
            if (name && img) {
                this.model.addCate(name, img)
                    .then(() => {
                        window.location.href = "?ctrl=cate"
                    })
            } else {
                console.log("lỗi")
            }
        })
    }

    async loadForm_edit(id : string  | null) {
        const response = await fetch(this.url + "categories/" + id);
        const data = await response.json();

        let formAdd = document.getElementById("form_add") as HTMLElement

        formAdd.innerHTML = `
         <form action="" method="post">
         <div>
            ID: 
            <input type="text" id="txt_id_edit" readonly value="${id}">

         </div>
         <div>
             Tên Danh Mục:
             <input type="text" id="txt_name_edit" value="${data.name}">
    
         </div>
         <div>
             IMG:
             <input type="text" id="txt_img_edit" value="${data.img}">
             <img src="${data.img}" alt="" width = "150px">
    
         </div>
         <button type="submit" id="btn">Cập Nhật</button>
    
    
     </form> 
        `

        const form = formAdd.querySelector("form") as HTMLFormElement

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = (document.getElementById('txt_name_edit') as HTMLInputElement).value;
            const img = (document.getElementById('txt_img_edit') as HTMLInputElement).value;
            if (name && img) {
                console.log(name, img )
                this.model.updateCate(id, name, img)
                    .then(() => {
                        window.location.href = "?ctrl=cate"
                    })
            } else {
                console.log("lỗi")
            }
        })
    }


}


