//var url = "http://localhost:3000/";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class CategoryModel {
    constructor(url, id, name, img) {
        this.url = url;
        this.id = null;
        this.name = name;
        this.img = img;
    }
    getCate() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.url + "categories");
            let data = yield res.json();
            return data;
            // console.log(data)
        });
    }
    deleteCate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.url + "categories/" + id, {
                method: 'DELETE'
            });
            return response.ok;
        });
    }
    addCate(name, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCate = {
                name: name,
                img: img,
            };
            const response = yield fetch(this.url + "categories", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCate)
            });
            return response.ok;
        });
    }
    updateCate(id, name, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const upCate = {
                name: name,
                img: img,
            };
            console.log(name, img);
            const response = yield fetch(this.url + "categories/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(upCate)
            });
            return response.ok;
        });
    }
}
