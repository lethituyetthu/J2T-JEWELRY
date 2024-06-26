var url = "http://localhost:3000/";
import CategoryModel from './model/categoryModel.js';
import CategoryController from './controller_ad/categoryController.js';
import CategoryView from './views_ad/category.js';
import ProductModel from "./model/productModel.js";
import ProductView from "./views_ad/productView.js";
import ProductController from "./controller_ad/productController.js";
const categoryModel = new CategoryModel(url, null, "", "");
const categoryViews = new CategoryView(url);
const productModel = new ProductModel(url, null, "", "", 0, 0, "", "");
const productView = new ProductView(url);
let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let ctrl = params.get("ctrl");
let act = params.get("act");
let id = params.get("id");
let control;
console.log(act);
switch (ctrl) {
    case "cate":
        const categoriesController = new CategoryController(categoryModel, categoryViews);
        control = categoriesController.loadCate();
        if (act === "add") {
            categoryViews.loadForm();
        }
        else if (act === "update" && id === id) {
            categoryViews.loadForm_edit(id);
        }
        else if (act === "delete" && id === id) {
            // gọi hàm lọc pro theo cate để kt danh mục có liên kết với sp chưa
            productModel.getProduct_by_cate(id)
                .then(product => {
                // kiểm tra sl pro trong hàm trả về 
                if (product.length > 0) {
                    alert(" Danh Mục Này Có Liên Kết Với Sản Phẩm Không Thể Xóa");
                }
                else {
                    categoryModel.deleteCate(id)
                        .then(() => {
                        window.location.href = "?ctrl=cate";
                    });
                }
            });
        }
        else {
            categoriesController.loadCate();
        }
        break;
    case "product":
        const productController = new ProductController(productModel, productView);
        if (act === "add") {
            productView.loadForm();
        }
        else if (act === "update" && id === id) {
            productView.formEdit(id);
        }
        else if (act === "delete" && id === id) {
            productModel.deleteProduct(id)
                .then(() => {
                window.location.href = "?ctrl=product";
            });
        }
        else {
            productController.loadPro();
        }
        break;
    default:
        break;
}
eval('control');
