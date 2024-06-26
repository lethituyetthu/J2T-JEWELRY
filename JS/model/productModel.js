// import CategoryModel from "./categoryModel.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class ProductModel {
    constructor(url, id, name, img, price, price_sale, cate_id, status) {
        this.url = url;
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.price_sale = price_sale;
        this.cate_id = cate_id;
        this.status = status;
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.url + "products");
            let data = yield res.json();
            return data;
        });
    }
    // 
    getProduct_by_cate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.url + "products/cate/" + id);
            let data = yield res.json();
            return data;
        });
    }
    // thêm sp
    addProduct(newPro) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "products", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPro)
            });
            return response.ok;
        });
    }
    // xóa sp 
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "products/" + id, {
                method: 'DELETE'
            });
            return response.ok;
        });
    }
    // update sp
    updatePro(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "products/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            });
            return response.ok;
        });
    }
}
