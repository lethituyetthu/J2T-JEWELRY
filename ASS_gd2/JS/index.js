var url = "http://localhost:3000/";
import CategoryModel from "./model/categoryModel.js";
import Cate_controller from "./controller/cate_controller.js";
import Cate_view from "./views/cate_view.js";
import ProductModel from "./model/productModel.js";
import Pro_view from "./views/pro_view.js";
import Pro_controller from "./controller/pro_controller.js";
import UserModel from "./model/userModel.js";
import User_view from "./views/user_view.js";
const categoryModel = new CategoryModel(url, null, "", "");
const categoryViews = new Cate_view(url);
const productModel = new ProductModel(url, null, "", "", 0, 0, "", "");
const productView = new Pro_view(url);
const userModel = new UserModel(url, null, "", " ", "", "");
const userView = new User_view(url);
let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let ctrl = params.get("ctrl");
let act = params.get("act");
let id = params.get("id");
let control;
switch (ctrl) {
    case "login":
        var modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = "block";
            userView.form_dn();
        }
        break;
    case "register":
        var modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = "block";
            userView.form_dk();
        }
        break;
    case "detail":
        if (id) {
            var modal = document.getElementById('modal');
            if (modal) {
                modal.style.display = "block";
                productView.showDetail(id);
            }
        }
    default:
        const categoryController = new Cate_controller(categoryModel, categoryViews);
        categoryController.loadCate();
        const productController = new Pro_controller(productModel, productView);
        productController.loadPro_index();
        break;
}
