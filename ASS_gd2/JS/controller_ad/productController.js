var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    loadPro() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.getProduct();
            this.view.showProduct(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.deleteProduct(id);
            if (response) {
                this.loadPro();
            }
        });
    }
    addProduct(newPro) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.addProduct(newPro);
            if (response) {
                this.loadPro();
            }
            else {
                alert("Thêm Sản Phẩm Không Thành Công");
            }
        });
    }
    updatePro(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.updatePro(id, update);
            if (response) {
                this.loadPro();
            }
            else {
                alert("Cập Nhật Sản Phẩm Không Thành Công");
            }
        });
    }
}
