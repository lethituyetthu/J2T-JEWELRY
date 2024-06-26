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
    loadPro_index() {
        return __awaiter(this, void 0, void 0, function* () {
            const pro = yield this.model.getProduct();
            this.view.showPro_new(pro);
            this.view.showPro_sale(pro);
        });
    }
    loadPro_listPro() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.getProduct();
            this.view.showPro(data);
        });
    }
    loadPro_by_cate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pro = yield this.model.getProduct_by_cate(id);
            console.log(pro);
            this.view.showPro(pro);
        });
    }
}
