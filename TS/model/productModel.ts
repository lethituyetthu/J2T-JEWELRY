    // import CategoryModel from "./categoryModel.js";

    export type Products = {
        id:  null;
        name: string;
        img: string;
        price: number;
        price_sale: number;
        cate_id: string;
        status: string;
    }

    export default class ProductModel {

        id:  null;
        name: string;
        img: string;
        price: number;
        price_sale: number;
        cate_id: string;
        status: string;

        url : string
        static find: any;
        constructor(url: string ,id: null, name: string, img: string, price: number, price_sale: number, cate_id: string, status: string) {
            this.url = url
            this.id = id
            this.name = name
            this.img = img
            this.price = price
            this.price_sale = price_sale
            this.cate_id = cate_id
            this.status = status
        }

        async getProduct() {
            let res = await fetch(this.url + "products");
            let data = await res.json() as Products[];

        return data ;
        }
        // 
        async getProduct_by_cate(id : string | null){

            let res = await fetch(this.url + "products/cate/" + id)
            let data = await res.json() as Products[]

            return data;

        }

        // thêm sp
        async addProduct(newPro : any) {
        
            const response = await fetch(this.url + "products", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPro)
            });
        
            return response.ok
        }

        // xóa sp 

        async deleteProduct(id: string | null) {
            const response = await fetch(this.url + "products/" + id, {
                method: 'DELETE'
            });

            return response.ok
        }

        // update sp

        async updatePro(id: string| null , update : any) {
    
            const response = await fetch(this.url + "products/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            });
            
            return response.ok
        }

        /* async hasPro_inCate(cate_id : string |null ){
            const product = await ProductModel.find({cate_id : cate_id})
            return product.length > 0 ;
        } */

    }
