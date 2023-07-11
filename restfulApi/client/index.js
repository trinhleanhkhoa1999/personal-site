const api = "http://localhost:3000/users";
const btnCreate = document.querySelector("#btnCreate");
const nameHeader = document.querySelector("#nameHeader");

const handleCreateUser = async () => {
  btnCreate.onclick = async () => {
    const idInput = document.querySelector("#id");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");

    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!id || !name || !email) {
      return;
    }

    try {
      const response = await fetch(api, {
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
      const data = await response.json();
      console.log(data);
      idInput.value = "";
      nameInput.value = "";
      emailInput.value = "";
    } catch (err) {
      alert("An error occurred", err);
    }
  };
};

handleCreateUser();

const handleDeleteUser = (id) => {
  fetch(`${api}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(`Success deleted users with id: ${id}`);
    });
  1;
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
      const response = await fetch(`${api}/${userId}`, {
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

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("An error occurred");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };
};

const handleShowUser = async () => {
  const response = await fetch(api);
  const data = await response.json();
  const html = data.map((item) => {
    return `
      <tr>
        <th scope="row">${item.id}</th>
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

  return data;
};

handleShowUser();
