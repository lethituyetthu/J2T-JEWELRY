import { Categories } from "../model/categoryModel";
import ProductModel from "../model/productModel";
import ProductView from "../views_ad/productView";

export default class  ProductController {
    model : ProductModel
    view : ProductView 

    constructor (model :ProductModel , view: ProductView){
        this.model = model 
        this.view = view 
    }

    async loadPro(){
        const product = await this.model.getProduct();
        this.view.showProduct(product)
    }

    async deleteProduct(id:null) {
       
        const response = await this.model.deleteProduct(id)

        if(response){
            this.loadPro()
        }
    }
    async addProduct(newPro: any) {

        const response = await this.model.addProduct(newPro)

        if(response){
            this.loadPro()
            
        }else {
            alert("Thêm Sản Phẩm Không Thành Công")
        }

    }

    async updatePro(id:string , update : any){

        const response = await this.model.updatePro(id, update)

        if(response){
            this.loadPro()
        }else {
            alert("Cập Nhật Sản Phẩm Không Thành Công")
        }
    }
}