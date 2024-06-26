var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CategoryModel from "../model/categoryModel.js";
import ProductModel from "../model/productModel.js";
export default class Pro_View {
    constructor(url) {
        this.url = url;
        this.model = new ProductModel(url, null, "", "", 0, 0, "", "");
        this.model_cate = new CategoryModel(url, null, "", "");
    }
    showPro_new(data) {
        let filterData_New = data.filter(product => product.status === "New");
        let limit_data = filterData_New.splice(0, 4);
        console.log(limit_data);
        limit_data.forEach(element => {
            let kq = document.createElement("div");
            kq.classList.add("box");
            kq.innerHTML = `
        
            <div class="image-container">
                <p class="new-label">${element.status}</p>
                <img src="${element.img}" alt=""
                    width="250px">
            </div>
            <p class="box-price">${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
            <p class="box-name"><a href="?ctrl=detail&id=${element.id}">${element.name}</a></p>

`;
            let content = document.getElementById("product-new");
            // console.log(kq)
            content.appendChild(kq);
        });
    }
    showPro_sale(data) {
        let filterData_Sale = data.filter(product => product.status === "Sale");
        let limit_data = filterData_Sale.splice(0, 8);
        console.log(limit_data);
        limit_data.forEach(element => {
            let phantram_giagiam = ((element.price - element.price_sale) / element.price) * 100;
            let kq = document.createElement("div");
            kq.classList.add("box-sale");
            kq.innerHTML = `
        
       
            <div class="image-container">
                <p class="sale-label">${phantram_giagiam.toFixed(0)}%</p>
                <img src="${element.img}" alt=""
                    width="200px">
            </div>
            <p class="sale-priceSale">${element.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p class="sale-price">${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p class="sale-name"><a href="?ctrl=detail&id=${element.id}">${element.name}</a></p>

        
`;
            let content = document.getElementById("product-sale");
            // console.log(kq)
            content.appendChild(kq);
        });
    }
    showPro(data) {
        let content = document.getElementById('list_pro');
        content.innerHTML = "";
        data.forEach(el => {
            let div = document.createElement("div");
            div.classList.add("box");
            div.innerHTML = `
            
                <div class="image-container">
                    <p class="new-label">${el.status}</p>
                    <img src="${el.img}" alt=""
                        width="220px">
                </div>

                <div class="price">
                  <s>${el.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</s>
                  <p class="price-sale">${el.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
                <p class="box-name"><a href="?ctrl=detail&id=${el.id}">${el.name}</a></p>
           
            `;
            content.appendChild(div);
        });
    }
    showDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.model_cate.getCate();
            const response = yield fetch(this.url + "products/" + id);
            const data = yield response.json();
            console.log(data);
            let div = document.createElement("div");
            div.classList.add("modal-content");
            div.innerHTML = `
                
                    <span class="close">&times;</span>
                    <div class="product-details">
                       <div class="name">
                            <img src="${data.img}" alt="${data.name}" width="200px">
                            <h2>${data.name}</h2>
                       </div>
                       <div>
                       <p class="status">Sản Phẩm: ${data.status}</p><br>
                        <p class="price">Giá: ${data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p><br>
                        <p class="price_sale">Giá Bán: ${data.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p><br>
                       </div>
                    </div>
                
            `;
            let content = document.getElementById("modal");
            console.log(div);
            content.appendChild(div);
            // Đóng cửa sổ modal khi người dùng nhấp vào nút đóng
            const closeBtn = content.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    content.style.display = 'none';
                    window.location.href = "index.html";
                });
            }
        });
    }
}
