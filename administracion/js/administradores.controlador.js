const login = async () => {
  const payload = {
    usuario: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  console.log("login: ", payload);
  const result = await fetch("http://localhost:3000/administradores/login", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response || !response.status) {
    alert("usuario o contraseña incorrecta");
  } else {
    localStorage.setItem("usuario", JSON.stringify(response.usuario));
    window.location.href = "./html/Menu.html";
  }
  console.log(response);
};
