import { Categories } from '../model/categoryModel.js'
import CategoryModel from '../model/categoryModel.js';

export default class Cate_view {
    private model: CategoryModel;
    url: string

    constructor(url : string) {
        this.url = url
        this.model = new CategoryModel(url,null, "", "")
    }

    showIndex(data: Categories[]){

        data.forEach( element => {
            let kq = document.createElement("div")
            kq.classList.add("cate-box")
    
            kq.innerHTML = `
    
            <img class="cate-box-img" src="${element.img}" alt="">
            <p class="cate-box-name"><a href ="list-sp.html?ctrl=cate&id=${element.id}">${element.name}</a></p>
            
            `
    
            let content = document.getElementById("category") as HTMLElement
            content.appendChild(kq)
        })

    }

    showCate_listPro(data :Categories[]){
        data.forEach(el => {
            let p = document.createElement("p")
            p.classList.add("categories-item")

            p.innerHTML = `

           <a href="?ctrl=cate&id=${el.id}">${el.name}</a>


            `
            let content = document.getElementById("categories") as HTMLElement
            content.appendChild(p)
        })

    }



}