import CategoryModel from "../model/categoryModel";
import CategoryView from "../views_ad/category";

export default class CategoryController {

    model : CategoryModel ;

    view : CategoryView ;

    constructor( model: CategoryModel, view : CategoryView){
        this.model = model 
        this.view = view 
    }

    // load danh mục từ model về view
    async loadCate(){
        const category = await this.model.getCate();
        this.view.showCate(category)
    }

    async deleteCate(id : null){
        const response = await this.model.deleteCate(id)

        if (response) {
            this.loadCate()
        }

    }

    async addCate(name:string ,img:string){
       
        const response = await this.model.addCate(name ,img)

        if(response){
            this.loadCate()
        }else{
            alert("thêm sp không thành công")
        }
    }

    async updateCate(id: string | null , name:string ,img:string){
       
        const response = await this.model.updateCate(id ,name ,img)
        
        console.log(response)
        this.loadCate()
       
    }



    





}