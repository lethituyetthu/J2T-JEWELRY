
var url = "http://localhost:3000/";

// Lấy modal
var modal = document.getElementById("myModal") as HTMLElement;

// Lấy nút mở modal
var btn = document.querySelector("button") as HTMLElement;

// Lấy phần tử <span> đóng modal
var span = document.getElementsByClassName("close")[0];

// Khi người dùng nhấn nút, mở modal
function openModal() {
    modal.style.display = "block";
}

// Khi người dùng nhấn vào <span> (x), đóng modal
function closeModal() {
    modal.style.display = "none";
}

// Khi người dùng nhấn bất kỳ đâu bên ngoài modal, đóng modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


 type Products = {
    id:  null;
    name: string;
    img: string;
    price: number;
    price_sale: number;
    cate_id: string;
    status: string;
}

 type Cate = {
    id:  null,
    name: string,
    img: string
}
 class Category_p {
    id: null ;
    name: string;
    img: string;
    constructor(id: null, name: string, img: string) {
        this.id = null
        this.name = name
        this.img = img
    }

    async getCate() {
        let res = await fetch(url + "categories");
        let data = await res.json() as Cate[];

        /* this.showCate(data); */
      //  console.log(data)
        return data
    }
}

const cate = new Category_p(null, "", "") // Tạo một đối tượng Category
cate.getCate()

class Product {

    id:  null;
    name: string;
    img: string;
    price: number;
    price_sale: number;
    cate_id: string;
    status: string;
    constructor(id: null, name: string, img: string, price: number, price_sale: number, cate_id: string, status: string) {
        this.id = id
        this.name = name
        this.img = img
        this.price = price
        this.price_sale = price_sale
        this.cate_id = cate_id
        this.status = status
    }

    async getProduct() {
        let res = await fetch(url + "products");
        let data = await res.json() as Products[];

        this.showProduct(data)
      console.log(data)
    }

    async showProduct(data : Products[]){

        const categoryInstance = new Category_p(null, "", "");
        const categories = await categoryInstance.getCate();


        data.forEach(async (element) => {
           let category = categories.find((cat: Cate) => cat.id === element.cate_id);
            /*  console.log(category) */
           let categoryName = category ? category.name : 'Không xác định';
    
            /*  console.log(element.status) */
            let kq = document.createElement("tr");
    
           /*  console.log(element.img) */
    
            kq.innerHTML = `
                <td>${element.id}</td>
                <td class="sp"> <img src="${element.img}" alt="${element.name}" width ="100px"><p>${element.name}</p></td>
                <td>${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>${element.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>${categoryName}</td>
                <td>${element.status}</td>
                <td><button type="button" onclick="     pro.deleteProduct('${element.id}')">Xóa</button><button type="button" onclick="pro.formEdit('${element.id}' )">Sửa</button></td>
            
    `
            let content = document.getElementById("list-products") as HTMLElement
            /*   console.log(kq) */
            content.appendChild(kq)
        })

         data.sort((a, b) => (a.id && b.id) ? (parseInt(b.id) - parseInt(a.id)) : 0 )


    }
    // load form thêm sp
    async loadForm() {
        const categoryInstance = new Category_p(null, "", "");
        const categories = await categoryInstance.getCate();
        let form = document.createElement("Form") 
        form.innerHTML = `
         <form action="" class="">
         <div>
             Tên Sản Phẩm:
             <input type="text" id="txt_name">
    
         </div>
         <div>
             IMG:
             <input type="text" id="txt_img">
    
         </div>
         <div>
             Giá:
             <input type="text" id="txt_price">
    
         </div>
         <div>
             Giá Sale:
             <input type="text" id="txt_price_sale">
    
         </div>
         <div id="list_cate">
             Danh Mục:
             <select name="" id="txt_cate">
                 
             </select> 
    
         </div>
         <div>
             Trạng Thái Sản Phẩm:
             <select name="" id="txt_status">
                 <option value="New">New</option>
                 <option value="Sale">Sale</option>
             </select>
    
         </div>
         <br>
    
         <button type="button" class= btn" onclick=" pro.addProduct()">Add</button>
    
    
        </form> 
        `
    
        let selectCate = form.querySelector("#txt_cate") as HTMLSelectElement;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.setAttribute("value", category.id + "");
            option.textContent = category.name + "";
            selectCate.appendChild(option);
        });
    
        let content = document.querySelector("#addPro") as HTMLElement
    
        content.innerHTML = ""
        content.appendChild(form)
    }
    // thêm sp
    async addProduct() {

        /*  const id = (document.getElementById('txt_id') as HTMLInputElement).value; */
    
        const name = (document.getElementById('txt_name') as HTMLInputElement).value;
        const img = (document.getElementById('txt_img') as HTMLInputElement).value;
        const price = Number((document.getElementById('txt_price') as HTMLInputElement).value);
        const price_sale = Number((document.getElementById('txt_price_sale') as HTMLInputElement).value);
        const cate_id = (document.getElementById('txt_cate') as HTMLInputElement).value;
        const status = (document.getElementById('txt_status') as HTMLInputElement).value;
        /*   console.log(status) */
    
    
        if (name === '' || img === '' || cate_id === '' || status === '') {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
            return;
        }
    
       
        if (isNaN(price) || isNaN(price_sale) || price <= 0 || price_sale <= 0 || price_sale >= price) {
            alert('Giá và giá sale phải là số dương và giá sale phải nhỏ hơn giá.');
            return;
        }
        const newPro: Omit<Products, "id"> = {
            name: name,
            img: img,
            price: price,
            price_sale: price_sale,
            cate_id: cate_id,
            status: status
        };
        console.log(img)
    
        const response = await fetch(url + "products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPro)
        });
    
        if (response.ok) {
    
            location.reload();
        }
    }
    // xóa sp
    async deleteProduct(id: string) {
        const response = await fetch(url + "products/" + id, {
            method: 'DELETE'
        });
    
    
        location.reload();
    
    
    
    }

    // load form edit sp
    
    async formEdit(id: string) {
        const categoryInstance = new Category_p(null, "", "");
        const categories = await categoryInstance.getCate();
        const response = await fetch(url + "products/" + id);
        const data = await response.json();
    
        console.log(id)
        let form = document.createElement("Form")
        form.classList.add("form_edit")
        form.innerHTML = `
        
    
        <div>ID :
            <input type="text" id="txt_id_edit" value="${id}" readonly style="background-color: #ccc;">
    
        </div>
        <div>
            Tên Sản Phẩm:
            <input type="text" id="txt_name_edit"  value="${data.name}">
    
        </div>
        <div>
            IMG:
            <input type="text" id="txt_img_edit"  value="${data.img}">
    
        </div>
        <div>
            Giá:
            <input type="text" id="txt_price_edit"  value="${data.price}">
    
        </div>
        <div>
            Giá Sale:
            <input type="text" id="txt_price_sale_edit"  value="${data.price_sale}">
    
        </div>
        <div id="list_cate">
            Danh Mục:
            <select name="" id="txt_cate_edit">
                
            </select> 
    
        </div>
        <div>
            Trạng Thái Sản Phẩm:
            <select name="" id="txt_status_edit">
                <option value="New" ${data.status === "New" ? "selected" : ""}>Mới</option>
                <option value="Sale" ${data.status === "Sale" ? "selected" : ""}>Sale</option>
            </select>
    
        </div>
    
        <button type="button" class="btn" onclick="pro.updatePro('${id}')">Cập Nhật</button>
    
    
    
       `;
        // show danh mục vào thẻ select 
        let selectCate = form.querySelector("#txt_cate_edit") as HTMLSelectElement;
        categories.forEach(category => {
            let option = document.createElement("option");
            option.setAttribute("value", category.id + "");
            option.textContent = category.name + "";
            selectCate.appendChild(option);
    
            if (category.id === data.cate_id) {
                option.selected = true; // Đặt thuộc tính selected cho tùy chọn nếu trùng
            }
        });
    
        let content = document.querySelector("#my_form_edit") as HTMLElement;
    
        content.innerHTML = "";
    
        content.appendChild(form);
    }

    // cập nhật sp
    async  updatePro(id: string) {
        const name = (document.getElementById('txt_name_edit') as HTMLInputElement).value;
        const img = (document.getElementById('txt_img_edit') as HTMLInputElement).value;
        const price = Number((document.getElementById('txt_price_edit') as HTMLInputElement).value);
        const price_sale = Number((document.getElementById('txt_price_sale_edit') as HTMLInputElement).value);
        const cate_id = (document.getElementById('txt_cate_edit') as HTMLInputElement).value;
        const status = (document.getElementById('txt_status_edit') as HTMLInputElement).value;
    
        const update: Omit<Products, "id"> = {
            //id: null, 
            name: name,
            img: img,
            price: price,
            price_sale: price_sale,
            cate_id: cate_id,
            status: status
        };
        console.log(id)
        const response = await fetch(url + "products/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        });
        if (response.ok) {
            console.log("Sản phẩm đã được cập nhật.");
            location.reload();
        }
    }
    
    
}

const pro = new Product(null, "", "", 0, 0, "", "")
pro.getProduct();
pro.loadForm();

