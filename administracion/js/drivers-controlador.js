let dataTable;
let dataTableInitialized = false;
let drivers = [];
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
    const response = await fetch("http://localhost:3000/drivers", {
      method: "GET",
    });
    drivers = await response.json();
    console.log("Drivers: ", drivers);

    let content = ``;
    drivers.forEach((driver) => {
      // Cambio de nombre de variable para evitar conflicto
      const id = driver.id;
      const nombre = driver.nombre;
      const phone = driver.phone;
      const email = driver.email;
      const status = driver.status;
      const city = driver.city;
      content += `
        <tr>
          <td>${id}</td>
          <td>${nombre}</td>
          <td>${phone}</td>
          <td>${email}</td>
          <td>${city}</td>
          <td>${status}</td>
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
    id: document.getElementById("idDriver").value,
    nombre: document.getElementById("idNombre").value,
    phone: document.getElementById("idPhone").value,
    email: document.getElementById("idEmail").value,
    city: document.getElementById("idCity").value,
    status: document.getElementById("idStatus").value,
  };
  console.log("Add: ", payload);
  const result = await fetch("http://localhost:3000/drivers", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("Driver added successfully, please refresh the page");
  } else {
    localStorage.setItem("usuario", JSON.stringify(response.usuario));
  }
  console.log("estoy agregando un conductor");
};

//editar
const editar = async (id) => {
  let driver = {};
  drivers.filter((driv) => {
    if (driv.id == id) {
      driver = driv;
    }
  });
  document.querySelector("#formModal #idDriver").value = driver.id;
  document.querySelector("#formModal #idNombre").value = driver.nombre;
  document.querySelector("#formModal #idPhone").value = driver.phone;
  document.querySelector("#formModal #idEmail").value = driver.email;
  document.querySelector("#formModal #idCity").value = driver.city;
  document.querySelector("#formModal #idStatus").value = driver.status;

  console.log(driver);

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
  const driver = {
    id: document.querySelector("#formModal #idDriver").value,
    nombre: document.querySelector("#formModal #idNombre").value,
    phone: document.querySelector("#formModal #idPhone").value,
    email: document.querySelector("#formModal #idEmail").value,
    city: document.querySelector("#formModal #idCity").value,
    status: document.querySelector("#formModal #idStatus").value,
  };
  console.log("edit: ", driver);
  const result = await fetch(`http://localhost:3000/drivers/${driver.id}`, {
    headers: { "Content-type": "application/json" },
    method: "PUT",
    body: JSON.stringify(driver),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("Updated driver, reload the page");
  } else {
    localStorage.setItem("Driver", JSON.stringify(response.usuario));
  }
  console.log("estoy actualizando un conductor");
};

//eliminar
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
  const result = await fetch(`http://localhost:3000/drivers/${idDelete}`, {
    headers: { "Content-type": "application/json" },
    method: "DELETE",
  });
  const response = await result.json();

  if (!response || !response.status) {
    alert("driver delete successfully, please refresh the page");
  }
  console.log("se elimino el conductor");
  idDelete = null;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
