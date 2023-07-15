const api = "http://localhost:3000/users";

const inputId = document.querySelector("#id");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");

const btnCreate = document.querySelector("#btnCreate");
const nameHeader = document.querySelector("#nameHeader");

const handleCreateUser = async () => {
  const id = inputId.value;
  const name = inputName.value;
  const email = inputEmail.value;

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: +id,
        name: name,
        email: email,
      }),
    });
    if (res.ok) {
      render();
      idInput.value = "";
      nameInput.value = "";
      emailInput.value = "";
      return res.json();
    }
  } catch (err) {
    console.log(err);
    alert("An error occurred");
  }
};

btnCreate.onclick = () => handleCreateUser();

const handleDeleteUser = async (id) => {
  const res = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
  render();
  return res.json();
};

const handleEditUser = async (userId) => {
  const valueUser = document.querySelector('[data-id="' + userId + '"]');
  console.log("valueUser", valueUser);

  const idInput = document.querySelector("#id");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");

  const name = valueUser.getAttribute("data-name");
  const email = valueUser.getAttribute("data-email");

  idInput.value = userId;
  nameInput.value = name;
  emailInput.value = email;

  const btnEdit = document.querySelector("#btnEdit");

  btnEdit.classList.remove("d-none");
  btnCreate.classList.add("d-none");
  nameHeader.innerHTML = "UpLoad Users";
  btnEdit.onclick = async () => {
    try {
      const res = await fetch(`${api}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          name: nameInput.value,
          email: emailInput.value,
        }),
      });

      if (res.ok) {
        render();
        idInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
        return res.json();
      } else {
        throw new Error("An error occurred");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };
};

const render = async () => {
  const res = await fetch(api);
  const data = await res.json();
  const html = data.map((item) => {
    return `
    <tr>
      <td scope="row">${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button data-id="${item.id}" data-name="${item.name}" data-email="${item.email}" 
        class="btn btn-warning" onclick="handleEditUser(${item.id})">Edit</button>
        <button class="btn btn-danger" onclick="handleDeleteUser(${item.id})">Delete</button>
      </td>
    </tr>
    `;
  });
  document.querySelector("#list-users").innerHTML = html.join("");
};
render();
