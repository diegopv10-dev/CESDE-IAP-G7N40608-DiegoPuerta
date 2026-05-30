function enviar(usuario) {
  const input = document.getElementById("chatMsg");
  const mensaje = input.value.trim();

  if (mensaje !== "") {
    let mensajes = JSON.parse(localStorage.getItem("chat")) || [];
    mensajes.push(usuario + ": " + mensaje);
    localStorage.setItem("chat", JSON.stringify(mensajes));
    mostrar();
    input.value = "";
  }
}


function borrar() {
  localStorage.removeItem("chat");
  mostrar();
}


function mostrar() {
  let mensajes = JSON.parse(localStorage.getItem("chat")) || [];
  document.getElementById("chat").innerHTML = mensajes.join("<br>");
}


function res(opcion, usuario) {
  const mensaje = "Solicitud " + opcion + " por " + usuario;
  document.getElementById("msg").innerText = mensaje;
  localStorage.setItem("solicitud", mensaje);

  
  if (opcion === "aceptada") {
    const solicitudes = document.getElementById("solicitudes");
    if (solicitudes) solicitudes.style.display = "none";
  }
}


function volver() {
  window.location.href = "index.html.html";
}


window.onload = function () {
  if (localStorage.getItem("solicitud")) {
    document.getElementById("msg").innerText = localStorage.getItem("solicitud");
  }
  mostrar();

  
};
