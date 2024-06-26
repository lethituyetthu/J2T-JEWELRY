import CategoryModel from "./model/categoryModel.js";
import ProductModel from "./model/productModel.js";
import ProductView from "./views/productView.js";
import ProductController from "./controller/productController.js";
const productModel = new ProductModel(null, "", "", 0, 0, "", "");
const categoryModel = new CategoryModel(null, "", "");
const productView = new ProductView();
const productController = new ProductController(productModel, productView);
productController.loadPro();
