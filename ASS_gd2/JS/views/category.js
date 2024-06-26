import CategoryModel from '../model/categoryModel.js';
export default class CategoryView {
    constructor() {
        this.model = new CategoryModel(null, "", "");
    }
    // show danh sách 
    showCate(data) {
        let table = ` 
            <div class="btn">
                 <a href="?ctrl=cate&act=add">Thêm Danh Mục</a>
            </div>

            <table id="list-cate" class="list">
                <thead>
                    <td style ="width:200px">ID</td>

                    <td class="sp">Danh Mục</td>

                    <td class="actions">Thao Tác</td>
                </thead>

            </table>
        
        `;
        let content = document.querySelector(".content");
        content.innerHTML = table;
        let listCate = document.getElementById("list-cate");
        data.forEach(el => {
            let kq = document.createElement("tr");
            kq.innerHTML = `
            <td>${el.id}</td>
            <td class="sp"> <img src="${el.img}" alt="${el.name}" width ="100px"> <p>${el.name}</p></td>

            <td>
                <a href="?ctrl=cate&act=delete&id=${el.id}"">Xóa</a> 
                <a href="?ctrl=cate&act=update&id=${el.id}" >Sửa</a>
            </td>
        
            `;
            listCate.appendChild(kq);
        });
        // thêm sự kiện xóa
        /* const btn_delete = document.querySelectorAll(".delete-btn")

        btn_delete.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id')
                if (id) {

                    console.log(id)
                    this.model.deleteCate(id)
                        .then(() => {
                            window.location.href = "?ctrl=cate"
                        })

                }
            })
        }) */
    }
    // load form thêm 
    loadForm() {
        let formAdd = document.getElementById("form_add");
        formAdd.innerHTML = `
         <form action="" method="post">
    
         <div>
             Tên Danh Mục:
             <input type="text" id="txt_name">
    
         </div>
         <div>
             IMG:
             <input type="text" id="txt_img">
    
         </div>
         <button type="submit" id="add-btn">Add</button>
    
    
     </form> 
        `;
        const form = formAdd.querySelector("form");
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('txt_name').value;
            const img = document.getElementById('txt_img').value;
            if (name === '' || img === '') {
                alert("Nhập Đầy Đủ Thông Tin Danh Mục");
                return;
            }
            console.log(name, img);
            if (name && img) {
                this.model.addCate(name, img)
                    .then(() => {
                    window.location.href = "?ctrl=cate";
                });
            }
            else {
                console.log("lỗi");
            }
        });
    }
}
