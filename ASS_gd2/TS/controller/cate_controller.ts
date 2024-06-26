import CategoryModel from "../model/categoryModel.js";
import Cate_view from "../views/cate_view.js";

export default class Cate_controller {

    model : CategoryModel ;

    view : Cate_view ;

    constructor( model: CategoryModel, view : Cate_view){
        this.model = model 
        this.view = view 
    }

    async loadCate() {

        const category = await this.model.getCate();
        this.view.showIndex(category)

    }

    async loadCate_listPro(){
        const category = await this.model.getCate()
        this.view.showCate_listPro(category)
    }

}
