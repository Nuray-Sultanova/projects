const endpoint = "http://localhost:3000";
let users = [];
const searchInput = document.getElementById("searchInput");

const getAllUsers = () => {
  axios.get(endpoint + "/users").then((res) => {
    if (res.status === 200) {
      {
        users = res.data;
        ShowAllUsers(users); //ShowUser i burda cagiririq
        console.log(res.data);
      }
    }
  });
};

const ShowAllUsers = (users) => {
  const studentTable = document.getElementById("studentTable");
  studentTable.innerHTML = "";
  users.forEach((user) => {
    studentTable.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td>${user.status}</td>
        <td>${user.score}</td>
        <td>
          <button class="editBtn" onClick="editUsers('${user.id}')">Edit</button>
          <button class="deleteBtn" onClick="DeleteUser('${user.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
};

const DeleteUser = (id) => {
  Swal.fire({
    title: "Silmək istədiyinizə əminsiniz?",
    text: "Bu əməliyyat geri alınmaz!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Bəli, sil!",
    cancelButtonText: "Xeyr,silmə!",
  }).then((res) => {
    if (res.isConfirmed) {
      axios
        .delete(endpoint + `/users/${id}`)
        .then(() => {
          Swal.fire("Silindi!", "Məlumat uğurla silindi.", "success");
          getAllUsers();
        })
        .catch((err) => {
          Swal.fire("Xəta!", "Silinmə zamanı xəta baş verdi.", "error");
        });
    }
  });
};

const setFromVisible = (isVIsibile) => {
  const addnewForm = document.getElementById("addnewForm");
  const addNewelement = document.getElementById("addNewelement");
  const Name = document.getElementById("Name");

  if (isVIsibile) {
    addnewForm.style.display = "flex";
    addNewelement.innerHTML = "Bagla";
    Name.focus();
  } else {
    addnewForm.style.display = "none";
    addNewelement.innerHTML = "Yenisi yarat";
  }
};

const editUsers = (id) => {
  isShowForm = true;
  setFromVisible(isShowForm);
  mode = "edit";
  editingId = id;

  axios.get(endpoint + "/users/" + id).then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
      const Submitbtn = document.getElementById("Submitbtn");
      const Name = document.getElementById("Name");
      const Age = document.getElementById("Age");
      const City = document.getElementById("City");
      const Status = document.getElementById("Status");
      const Score = document.getElementById("Score");

      Submitbtn.value = "Yenile";
      Name.value = res.data.name;
      Age.value = res.data.age;
      City.value = res.data.city;
      Status.value = res.data.status;
      Score.value = res.data.score;
    }
  });
};

//==========================================================================
getAllUsers();

// Filtr funksiysi
searchInput.oninput = (e) => {
  const filteredData = users.filter((u) => {
    return u.name.includes(e.target.value) || u.city.includes(e.target.value);
  });
  ShowAllUsers(filteredData);
  console.log(e.target.value);
};

//add new user
let mode = "create";
let editingId = null;
let isShowForm = false;
const addNewelement = document.getElementById("addNewelement");
const addnewForm = document.getElementById("addnewForm");
setFromVisible(isShowForm);

addNewelement.onclick = () => {
  isShowForm = !isShowForm;
  setFromVisible(isShowForm);

  //form aciqdirsa onu sifirlayiriq
  if (isShowForm) {
    mode = "create";
    editingId = null;
    document.getElementById("Submitbtn").value = "Elave et";
    addnewForm.reset();
  }
};

addnewForm.onsubmit = (e) => {
  e.preventDefault();

  const Name = document.getElementById("Name");
  const Age = document.getElementById("Age");
  const City = document.getElementById("City");
  const Status = document.getElementById("Status");
  const Score = document.getElementById("Score");

  const data = {
    name: Name.value,
    age: Age.value,
    city: City.value,
    status: Status.value,
    score: Score.value,
  };

  console.log(data);

  if (mode === "create") {
    if (data.name && data.age && data.city && data.status && data.score) {
      axios.post(endpoint + "/users", data).then((res) => {
        if (res.status === 201 && res.statusText === "Created") {
          alert("yaradildi");
          Name.value = "";
          Name.focus();
          Age.value = "";
          City.value = "";
          Status.value = "";
          Score.value = "";
        }
        getAllUsers();
      });
    }
    // else {
    //   // getToast();
    // }
  } else {
    axios.put(endpoint + "/users/" + editingId, data).then((res) => {
      if (res.status === 200 && res.statusText === "OK") {
        // getToast()
        alert("Yenilendi");
        Name.value = "";
        Age.value = "";
        City.value = "";
        Status.value = "";
        Score.value = "";
        getAllUsers();
        mode = "create";
        editingId = null;
        isShowForm = false;
        setFromVisible(isShowForm);
        document.getElementById("Submitbtn").value = "ELave et";
      }
    });
  }
};

const cancelBtn = document.getElementById("cancelBtn");

cancelBtn.onclick = () => {
  const Name = document.getElementById("Name");
  const Age = document.getElementById("Age");
  const City = document.getElementById("City");
  const Status = document.getElementById("Status");
  const Score = document.getElementById("Score");

  Name.value = "";
  Age.value = "";
  City.value = "";
  Status.value = "";
  Score.value = "";
  getAllUsers();
  mode = "create";
  editingId = null;
  isShowForm = false;
  setFromVisible(isShowForm);
  document.getElementById("Submitbtn").value = "Elave et";
};
