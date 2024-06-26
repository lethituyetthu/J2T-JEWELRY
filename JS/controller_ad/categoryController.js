var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class CategoryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    // load danh mục từ model về view
    loadCate() {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.model.getCate();
            this.view.showCate(category);
        });
    }
    deleteCate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.deleteCate(id);
            if (response) {
                this.loadCate();
            }
        });
    }
    addCate(name, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.addCate(name, img);
            if (response) {
                this.loadCate();
            }
            else {
                alert("thêm sp không thành công");
            }
        });
    }
    updateCate(id, name, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.model.updateCate(id, name, img);
            console.log(response);
            this.loadCate();
        });
    }
}
