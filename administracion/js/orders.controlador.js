let dataTable;
let dataTableInitialized = false;
let orders = [];
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
    const response = await fetch("http://localhost:3000/orders", {
      method: "GET",
    });
    orders = await response.json();
    console.log("Ordenes: ", orders);

    let content = ``;
    orders.forEach((order) => {
      // Cambio de nombre de variable para evitar conflicto
      const id_order = order.id_order;
      const location = order.location;
      const distance_in_km = order.distance_in_km;
      const estimated_time = order.estimated_time;
      const total = order.total;
      const city = order.city;
      const driver = order.driver;
      content += `
        <tr>
          <td>${id_order}</td>
          <td>${location}</td>
          <td>${distance_in_km}</td>
          <td>${estimated_time}</td>
          <td>${total}</td>
          <td>${driver}</td>
          <td>
            <button type="button" class="btn btn-primary btn-edd" onclick="editar(${id_order})"><i class="fa-solid fa-pencil"></i></button>
            <button type="button" class="btn btn-danger btn-det" onclick="eliminarModal(${id_order})"><i class="fa-solid fa-trash-can"></i></button>
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
    id_order: document.getElementById("idOrder").value,
    location: document.getElementById("idLocation").value,
    distance_in_km: document.getElementById("idDistance").value,
    estimated_time: document.getElementById("idTime").value,
    total: document.getElementById("idTotal").value,
    city: document.getElementById("idCity").value,
    driver: document.getElementById("idDriver").value,
  };
  console.log("Add: ", payload);
  const result = await fetch("http://localhost:3000/orders", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("order added successfully, please refresh the page");
  } else {
    localStorage.setItem("usuario", JSON.stringify(response.usuario));
  }
  console.log("estoy agregando una orden");
};

//editar
const editar = async (id_order) => {
  let order = {};
  orders.filter((ord) => {
    if (ord.id_order == id_order) {
      order = ord;
    }
  });

  document.querySelector("#formModal #idOrder").value = order.id_order;
  document.querySelector("#formModal #idLocation").value = order.location;
  document.querySelector("#formModal #idDistance").value = order.distance_in_km;
  document.querySelector("#formModal #idTime").value = order.estimated_time;
  document.querySelector("#formModal #idTotal").value = order.total;
  document.querySelector("#formModal #idCity").value = order.city;
  document.querySelector("#formModal #idDriver").value = order.driver;

  console.log(order);

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
  const order = {
    id_order: document.querySelector("#formModal #idOrder").value,
    location: document.querySelector("#formModal #idLocation").value,
    distance_in_km: document.querySelector("#formModal #idDistance").value,
    estimated_time: document.querySelector("#formModal #idTime").value,
    total: document.querySelector("#formModal #idTotal").value,
    city: document.querySelector("#formModal #idCity").value,
    driver: document.querySelector("#formModal #idDriver").value,
  };
  console.log("edit: ", order);
  const result = await fetch(`http://localhost:3000/orders/${order.id_order}`, {
    headers: { "Content-type": "application/json" },
    method: "PUT",
    body: JSON.stringify(order),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("Updated order, reload the page");
  } else {
    localStorage.setItem("Orden", JSON.stringify(response.usuario));
  }
  console.log("estoy actualizando una orden");
};

//eliminar
const eliminarModal = async (id_order) => {
  idDelete = id_order;
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
  const result = await fetch(`http://localhost:3000/orders/${idDelete}`, {
    headers: { "Content-type": "application/json" },
    method: "DELETE",
  });
  const response = await result.json();

  if (!response || !response.status) {
    alert("orders delete successfully, please refresh the page");
  }
  console.log("se elimino la orden");
  idDelete = null;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
