import CategoryModel from './model/categoryModel.js';
import CategoryController from './controller/categoryController.js';
import CategoryView from './views/category.js';
const categoryModel = new CategoryModel(null, "", "");
const categoryViews = new CategoryView();
const categoriesController = new CategoryController(categoryModel, categoryViews);
categoriesController.loadCate();
categoryViews.loadForm();
