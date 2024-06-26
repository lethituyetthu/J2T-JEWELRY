import { Categories } from "../model/categoryModel.js";
import ProductModel from "../model/productModel.js";
import Pro_View from "../views/pro_view";

export default class  ProductController {
    model : ProductModel
    view : Pro_View 

    constructor (model :ProductModel , view: Pro_View){
        this.model = model 
        this.view = view 
    }

    async loadPro_index(){
        const pro = await this.model.getProduct()

        this.view.showPro_new(pro)
        this.view.showPro_sale(pro)
    }
    
    async loadPro_listPro(){
        const data = await this.model.getProduct()
        this.view.showPro(data)
    }

    async loadPro_by_cate(id : string|null ){
        const pro = await this.model.getProduct_by_cate(id)
        console.log(pro)
        this.view.showPro(pro)
    }



}
