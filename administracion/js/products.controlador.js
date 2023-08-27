let dataTable;
let dataTableInitialized = false;
let products = [];
let idDelete = null;

const dataTableOptions = {
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
    { orderable: false, targets: [0, 1, 2, 3, 4, 5, 6] },
  ],
  //pageLength:3,
  destroy: true,
};

const initDataTable = async () => {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  await listUsers();

  dataTable = $("#dataTable_users").dataTable(dataTableOptions);
  dataTableInitialized = true;
};

const listUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
    });
    products = await response.json();
    console.log("Productos: ", products);

    let content = ``;
    products.forEach((product) => {
      // Cambio de nombre de variable para evitar conflicto
      const idProduct = product.idProduct;
      const name = product.name;
      const price = product.price;
      const brand = product.brand;
      const type = product.type;
      const age = product.age;
      content += `
        <tr>
          <td>${idProduct}</td>
          <td>${name}</td>
          <td>${price}</td>
          <td>${brand}</td>
          <td>${type}</td>
          <td>${age}</td>
          <td>
            <button type="button" class="btn btn-primary btn-edd" onclick="editar(${idProduct})"><i class="fa-solid fa-pencil"></i></button>
            <button type="button" class="btn btn-danger btn-det" onclick="eliminarModal(${idProduct})"><i class="fa-solid fa-trash-can"></i></button>
          </td>
        </tr>`;
    });
    tableBody_users.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

//agregar
const openModal = document.querySelector(".btn-add");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal_close");
const agregarEnModal = document.querySelector(".agg");

openModal.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("lo apretaste");
  modal.classList.add("modal--show");
});
closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal--show");
});
agregarEnModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal--show");
});

const addCompany = async () => {
  const payload = {
    idProduct: document.getElementById("idProduct").value,
    name: document.getElementById("idName").value,
    price: document.getElementById("idPrice").value,
    img: document.getElementById("idImg").value,
    brand: document.getElementById("idBrand").value,
    type: document.getElementById("idType").value,
    age: document.getElementById("idAge").value,
  };
  console.log("Add: ", payload);
  const result = await fetch("http://localhost:3000/products", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("product added successfully, please refresh the page");
  } else {
    localStorage.setItem("usuario", JSON.stringify(response.usuario));
  }
  console.log("estoy agregando una compañia");
};

//editar
const editar = async (idProduct) => {
  let product = {};
  products.filter((prod) => {
    if (prod.idProduct == idProduct) {
      product = prod;
    }
  });

  document.querySelector("#formModal #idProduct").value = product.idProduct;
  document.querySelector("#formModal #idName").value = product.name;
  document.querySelector("#formModal #idPrice").value = product.price;
  document.querySelector("#formModal #idImg").value = product.img;
  document.querySelector("#formModal #idBrand").value = product.brand;
  document.querySelector("#formModal #idType").value = product.type;
  document.querySelector("#formModal #idAge").value = product.age;

  console.log(product);

  const openModal2 = document.querySelectorAll(".btn-edd");
  const modal2 = document.querySelector(".modal2");
  const closeModal2 = document.querySelector(".modal_close2");
  const editarEnModal = document.querySelector(".editt");

  // Declarar una variable para almacenar el estado de si el modal está abierto o no
  let isModalOpen = false;

  openModal2.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isModalOpen) {
        modal2.classList.add("modal--show2");
        // Actualizar el estado del modal a abierto
        isModalOpen = true;
      }
    });
  });

  closeModal2.addEventListener("click", (e) => {
    e.preventDefault();
    modal2.classList.remove("modal--show2");
  });

  editarEnModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal2.classList.remove("modal--show2");
  });
};

const putCompany = async () => {
  const product = {
    idProduct: document.querySelector("#formModal #idProduct").value,
    name: document.querySelector("#formModal #idName").value,
    price: document.querySelector("#formModal #idPrice").value,
    img: document.querySelector("#formModal #idImg").value,
    brand: document.querySelector("#formModal #idBrand").value,
    type: document.querySelector("#formModal #idType").value,
    age: document.querySelector("#formModal #idAge").value,
  };
  console.log("edit: ", product);
  const result = await fetch(
    `http://localhost:3000/products/${product.idProduct}`,
    {
      headers: { "Content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify(product),
    }
  );
  const response = await result.json();
  if (!response || !response.status) {
    alert("Updated product, reload the page");
  } else {
    localStorage.setItem("Producto", JSON.stringify(response.usuario));
  }
  console.log("estoy actualizando una compañia");
};

//eliminar
const eliminarModal = async (idProduct) => {
  idDelete = idProduct;
  console.log(idDelete);
  const openModal3 = document.querySelectorAll(".btn-det");
  const modal3 = document.querySelector(".modal3");
  const closeModal3 = document.querySelector(".modal_close3");
  const eliminarEnModal = document.querySelector(".dett");

  let isModalOpen3 = false;

  openModal3.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isModalOpen3) {
        modal3.classList.add("modal--show3");
        isModalOpen3 = true;
      }
    });
  });

  closeModal3.addEventListener("click", (e) => {
    e.preventDefault();
    modal3.classList.remove("modal--show3");
  });

  eliminarEnModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal3.classList.remove("modal--show3");
  });
};

const eliminar = async () => {};

const deleteCompany = async () => {
  const result = await fetch(`http://localhost:3000/products/${idDelete}`, {
    headers: { "Content-type": "application/json" },
    method: "DELETE",
  });
  const response = await result.json();

  if (!response || !response.status) {
    alert("product delete successfully, please refresh the page");
  }
  console.log("se elimino la compañia");
  idDelete = null;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
