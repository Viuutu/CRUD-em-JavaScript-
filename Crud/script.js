let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("user");
    div.innerHTML = `
      <p><strong>Nome:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <div class="actions">
        <button class="edit" onclick="editUser(${index})">Editar</button>
        <button onclick="deleteUser(${index})">Excluir</button>
      </div>
    `;
    userList.appendChild(div);
  });

  localStorage.setItem("users", JSON.stringify(users));
}

function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("index").value = index;
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const index = document.getElementById("index").value;

  if (index === "") {
    users.push({ name, email });
  } else {
    users[index] = { name, email };
    document.getElementById("index").value = "";
  }

  this.reset();
  renderUsers();
});

renderUsers();
