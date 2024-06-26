import CategoryModel from '../model/categoryModel.js';
export default class CategoryView_index {
    constructor() {
        this.model = new CategoryModel(null, "", "");
    }
    showCate(data) {
        data.forEach(element => {
            let kq = document.createElement("div");
            kq.classList.add("cate-box");
            kq.innerHTML = `
    
            <img class="cate-box-img" src="${element.img}" alt="">
            <p class="cate-box-name">${element.name}</p>
            
            `;
            let content = document.getElementById("category");
            content.appendChild(kq);
        });
    }
}
