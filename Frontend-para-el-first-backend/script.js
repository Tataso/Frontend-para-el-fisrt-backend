const API = "http://localhost:8000/libros";

document.getElementById("form-crear").addEventListener("submit", async e => {
  e.preventDefault();
  const libro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    isbn: document.getElementById("isbn").value,
    categoria: document.getElementById("categoria").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(libro)
  });

  if (res.ok) {
    alert("Libro creado ✅");
    e.target.reset();
    cargar_mis_Libritos();
  } else {
    alert("Error al crear libro ❌");
  }
});

async function cargar_mis_Libritos() {
  const res = await fetch(API);
  const libros = await res.json();

  const lista = document.getElementById("lista-libros");
  lista.innerHTML = "";

  libros.forEach(libro => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.categoria})
      <br><small>ISBN: ${libro.isbn}</small>
      <br>
      <button onclick="borrarLibro(${libro.id})">🗑️ Eliminar</button>
    `;
    lista.appendChild(item);
  });
}

async function buscar_mis_Libritos() {
  const termino = document.getElementById("busqueda").value;
  const res = await fetch(`${API}/buscar?titulo=${encodeURIComponent(termino)}`);
  const libros = await res.json();

  const lista = document.getElementById("lista-libros");
  lista.innerHTML = "";

  libros.forEach(libro => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.categoria})
      <br><small>ISBN: ${libro.isbn}</small>
      <br>
      <button onclick="borrarLibro(${libro.id})">🗑️ Eliminar</button>
    `;
    lista.appendChild(item);
  });
}

async function borrar_el_Libro(id) {
  const confirmar = confirm("¿Estás seguro de que querés eliminar este libro?");
  if (!confirmar) return;

  const res = await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    alert("Libro eliminado ✅");
    cargar_mis_Libritos();
  } else {
    alert("No se pudo eliminar ❌");
  }
}

// Cargar libros al abrir la página
cargar_mis_Libritos();
