
//var url = "http://localhost:3000/";

export type Categories = {
    id: null,
    name: string,
    img: string
}

export default class CategoryModel {
    id: null;
    name: string;
    img: string;
    url: string
    constructor(url: string, id: null, name: string, img: string) {
        this.url = url
        this.id = null
        this.name = name
        this.img = img
    }

    async getCate() {
        let res = await fetch(this.url + "categories");
        let data = await res.json() as Categories[];

        return data

        // console.log(data)
    }

    async deleteCate(id: string | null) {
        const response = await fetch(this.url + "categories/" + id, {
            method: 'DELETE'
        });

        return response.ok
    }

    async addCate(name: string, img: string) {

        const newCate: Omit<Categories, "id"> = {
            name: name,
            img: img,

        };
        const response = await fetch(this.url + "categories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCate)
        });

        return response.ok
    }

    async updateCate(id: string | null , name: string, img: string) {

        const upCate: Omit<Categories, "id"> = {
            name: name,
            img: img,

        };
        console.log(name, img)
        const response = await fetch(this.url + "categories/" + id , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(upCate)
        });

        return response.ok
    }
}