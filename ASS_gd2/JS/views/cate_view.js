import CategoryModel from '../model/categoryModel.js';
export default class Cate_view {
    constructor(url) {
        this.url = url;
        this.model = new CategoryModel(url, null, "", "");
    }
    showIndex(data) {
        data.forEach(element => {
            let kq = document.createElement("div");
            kq.classList.add("cate-box");
            kq.innerHTML = `
    
            <img class="cate-box-img" src="${element.img}" alt="">
            <p class="cate-box-name"><a href ="list-sp.html?ctrl=cate&id=${element.id}">${element.name}</a></p>
            
            `;
            let content = document.getElementById("category");
            content.appendChild(kq);
        });
    }
    showCate_listPro(data) {
        data.forEach(el => {
            let p = document.createElement("p");
            p.classList.add("categories-item");
            p.innerHTML = `

           <a href="?ctrl=cate&id=${el.id}">${el.name}</a>


            `;
            let content = document.getElementById("categories");
            content.appendChild(p);
        });
    }
}
