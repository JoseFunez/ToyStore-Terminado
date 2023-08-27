let dataTable;
let dataTableInitialized = false;
let companies = [];
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
    const response = await fetch("http://localhost:3000/companies", {
      method: "GET",
    });
    companies = await response.json();
    console.log("Compañias: ", companies);

    let content = ``;
    companies.forEach((companies) => {
      // Cambio de nombre de variable para evitar conflicto
      const id = companies.id;
      const name = companies.name;
      const logo = companies.logo;
      const corporate_number = companies.corporate_number;
      const corporate_email = companies.corporate_email;
      const products_in_stock = companies.products_in_stock;

      content += `
        <tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${logo}</td>
          <td>${corporate_number}</td>
          <td>${corporate_email}</td>
          <td><i class="fa-solid fa-check" style="color: green;"></td>
          <td>
            <button type="button" class="btn btn-primary btn-edd" onclick="editar(${id})"><i class="fa-solid fa-pencil"></i></button>
            <button type="button" class="btn btn-danger btn-det" onclick="eliminarModal(${id})"><i class="fa-solid fa-trash-can"></i></button>
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
    id: document.getElementById("idCompany").value,
    name: document.getElementById("idName").value,
    logo: document.getElementById("idLogo").value,
    corporate_number: document.getElementById("idNumber").value,
    corporate_email: document.getElementById("idEmail").value,
    //products_in_stock: document.getElementById("idProducts").value,
  };
  console.log("Add: ", payload);
  const result = await fetch("http://localhost:3000/companies", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("company added successfully, please refresh the page");
  } else {
    localStorage.setItem("usuario", JSON.stringify(response.usuario));
  }
  console.log("estoy agregando una compañia");
};

//editar
const editar = async (id) => {
  let company = {};
  companies.filter((comp) => {
    if (comp.id == id) {
      company = comp;
    }
  });

  document.querySelector("#formModal #idCompany").value = company.id;
  document.querySelector("#formModal #idName").value = company.name;
  document.querySelector("#formModal #idLogo").value = company.logo;
  document.querySelector("#formModal #idNumber").value =
    company.corporate_number;
  document.querySelector("#formModal #idEmail").value = company.corporate_email;

  console.log(company);

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
  const company = {
    id: document.querySelector("#formModal #idCompany").value,
    name: document.querySelector("#formModal #idName").value,
    logo: document.querySelector("#formModal #idLogo").value,
    corporate_number: document.querySelector("#formModal #idNumber").value,
    corporate_email: document.querySelector("#formModal #idEmail").value,
  };
  console.log("edit: ", company);
  const result = await fetch(`http://localhost:3000/companies/${company.id}`, {
    headers: { "Content-type": "application/json" },
    method: "PUT",
    body: JSON.stringify(company),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("Updated company, reload the page");
  } else {
    localStorage.setItem("company", JSON.stringify(response.usuario));
  }
  console.log("estoy actualizando una compañia");
};

//eliminar
const eliminarModal = async (id) => {
  idDelete = id;
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

const deleteCompany = async () => {
  const result = await fetch(`http://localhost:3000/companies/${idDelete}`, {
    headers: { "Content-type": "application/json" },
    method: "DELETE",
  });
  const response = await result.json();

  if (!response || !response.status) {
    alert("company delete successfully, please refresh the page");
  }
  console.log("se elimino la compañia");
  idDelete = null;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
