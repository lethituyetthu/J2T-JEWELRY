import CategoryModel, { Categories } from "../model/categoryModel.js";
import { Products } from "../model/productModel.js";

import ProductModel from "../model/productModel.js";

export default class ProductView {
    model: ProductModel;
    model_cate: CategoryModel;
    url: string 
    constructor(url : string) {
        this.url = url
        this.model = new ProductModel(url, null, "", "", 0, 0, "", "")
        this.model_cate = new CategoryModel(url, null, "", "")
    }
    
    async showProduct(data: Products[]) {

        let index = `

        <div class="btn">
        <a href="?ctrl=product&act=add"> Thêm Sản Phẩm </a>
        </div>
        
        
        <table id="list-products" class="list">
            <thead>
                <td class="id">ID</td>

                <td class="sp">Sản Phẩm</td>
                <td>Giá</td>
                <td>Giá Sale</td>
                <td>Danh Mục</td>
                <td>Trạng Thái</td>
                <td class="actions">Thao Tác</td>
            </thead>


        </table>
        `
        let content = document.querySelector(".content") as HTMLElement
        content.innerHTML = index

        
        const categories = await this.model_cate.getCate();

        let list_pro = document.getElementById("list-products") as HTMLElement

        data.forEach(async (element) => {
            let category = categories.find((cat: Categories) => cat.id === element.cate_id);
            /*  console.log(category) */
            let categoryName = category ? category.name : 'Không xác định';

            /*  console.log(element.status) */
            let kq = document.createElement("tr");

            /*  console.log(element.img) */

            kq.innerHTML = `
                <td>${element.id}</td>
                <td class="sp"> <img src="${element.img}" alt="${element.name}" width ="100px"><p>${element.name}</p></td>
                <td>${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>${element.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>${categoryName}</td>
                <td>${element.status}</td>
                <td>
                    <a href="?ctrl=product&act=delete&id=${element.id}">Xóa</button>
                    <a href="?ctrl=product&act=update&id=${element.id}" >Sửa</a>
                </td>
            
        `;
            /*   console.log(kq) */
            list_pro.appendChild(kq)
        console.log(kq)

        })

      

    }

    async loadForm() {
        const categories = await this.model_cate.getCate();

        let content = document.getElementById("form_add") as HTMLElement

        content.innerHTML = `
         <form action="" method="post">
         <div>
             Tên Sản Phẩm:
             <input type="text" id="txt_name">
    
         </div>
         <div>
             IMG:
             <input type="text" id="txt_img">
    
         </div>
         <div>
             Giá:
             <input type="text" id="txt_price">
    
         </div>
         <div>
             Giá Sale:
             <input type="text" id="txt_price_sale">
    
         </div>
         <div id="list_cate">
             Danh Mục:
             <select name="" id="txt_cate">
                 
             </select> 
    
         </div>
         <div>
             Trạng Thái Sản Phẩm:
             <select name="" id="txt_status">
                 <option value="New">New</option>
                 <option value="Sale">Sale</option>
             </select>
    
         </div>
         <br>
    
         <button type="submit" class= "btn-add-pro" >Add</button>
    
    
        </form> 
        `

        let selectCate = content.querySelector("#txt_cate") as HTMLSelectElement;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.setAttribute("value", category.id + "");
            option.textContent = category.name + "";
            selectCate.appendChild(option);
        });

        let form = content.querySelector("form") as HTMLFormElement

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = (document.getElementById('txt_name') as HTMLInputElement).value;
            const img = (document.getElementById('txt_img') as HTMLInputElement).value;
            const price = Number((document.getElementById('txt_price') as HTMLInputElement).value);
            const price_sale = Number((document.getElementById('txt_price_sale') as HTMLInputElement).value);
            const cate_id = (document.getElementById('txt_cate') as HTMLInputElement).value;
            const status = (document.getElementById('txt_status') as HTMLInputElement).value;



            if (name === '' || img === '' || cate_id === '' || status === '') {
                alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
                return;
            }


            if (isNaN(price) || isNaN(price_sale) || price <= 0 || price_sale <= 0 || price_sale >= price) {
                alert('Giá và giá sale phải là số dương và giá sale phải nhỏ hơn giá.');
                return;
            }

            const newPro = {
                name: name,
                img: img,
                price: price,
                price_sale: price_sale,
                cate_id: cate_id,
                status: status
            };

            if (newPro) {

                this.model.addProduct(newPro)
                    .then(() => {
                        window.location.href = "?ctrl=product"
                    }
                    )
            } else {
                console.log("Lỗi ")
            }
        })




    }

    async formEdit(id: string | null) {
        const categories = await this.model_cate.getCate();
        const response = await fetch(this.url + "products/" + id);
        const data = await response.json();

       // console.log(data)

        let content = document.getElementById("form_add") as HTMLElement

        content.innerHTML = `
         <form action="" method="post">
            <div>ID :
                <input type="text" id="txt_id_edit" value="${id}" readonly style="background-color: #ccc;">
        
            </div>
            <div>
                Tên Sản Phẩm:
                <input type="text" id="txt_name_edit"  value="${data.name}">
        
            </div>
            <div>
                IMG:
                <input type="text" id="txt_img_edit"  value="${data.img}">
                <img src="${data.img}" alt="" width = "150px">
        
            </div>
            <div>
                Giá:
                <input type="text" id="txt_price_edit"  value="${data.price}">
        
            </div>
            <div>
                Giá Sale:
                <input type="text" id="txt_price_sale_edit"  value="${data.price_sale}">
        
            </div>
            <div id="list_cate">
                Danh Mục:
                <select name="" id="txt_cate_edit">
                    
                </select> 
        
            </div>
            <div>
                Trạng Thái Sản Phẩm:
                <select name="" id="txt_status_edit">
                    <option value="New" ${data.status === "New" ? "selected" : ""}>New</option>
                    <option value="Sale" ${data.status === "Sale" ? "selected" : ""}>Sale</option>
                </select>
        
            </div>
        
            <button type="submit" class="btn" >Cập Nhật</button>
        </form> 
        `

        // show danh mục vào thẻ select 
        let selectCate = content.querySelector("#txt_cate_edit") as HTMLSelectElement;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.setAttribute("value", category.id + "");
            option.textContent = category.name + "";
            selectCate.appendChild(option);

            if (category.id === data.cate_id) {
                option.selected = true; // Đặt thuộc tính selected cho tùy chọn nếu trùng
            }
        });

        let form = content.querySelector("form") as HTMLFormElement

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = (document.getElementById('txt_name_edit') as HTMLInputElement).value;
            const img = (document.getElementById('txt_img_edit') as HTMLInputElement).value;
            const price = Number((document.getElementById('txt_price_edit') as HTMLInputElement).value);
            const price_sale = Number((document.getElementById('txt_price_sale_edit') as HTMLInputElement).value);
            const cate_id = (document.getElementById('txt_cate_edit') as HTMLInputElement).value;
            const status = (document.getElementById('txt_status_edit') as HTMLInputElement).value;

            const update: Omit<Products, "id"> = {
                //id: null, 
                name: name,
                img: img,
                price: price,
                price_sale: price_sale,
                cate_id: cate_id,
                status: status
            };
            if (update) {

                this.model.updatePro(id,update)
                    .then(() => {
                        window.location.href = "?ctrl=product"
                    }
                    )
            } else {
                console.log("Lỗi ")
            }


        })

    }
}

