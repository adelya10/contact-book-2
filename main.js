let btn = document.querySelector(".btn");
let name = document.querySelector(".name");
let email = document.querySelector(".email");
let img = document.querySelector(".img");
let ul = document.querySelector(".list");
btn.addEventListener("click", () => {
  if (!name.value.trim() || !email.value.trim() || !img.value.trim()) {
    alert("add smt");
    return;
  }
  let obj = {
    name: name.value,
    email: email.value,
    img: img.value,
  };
  setItemToStorage(obj);
  createElementStorage();
  name.value = "";
  email.value = "";
  img.value = "";
});
function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("contact")) || [];
  // вытаскиваем существующие таски, получаем массив и пребразовываем в обычный JS  формат, используя JSON.parse()
  data.push(task);
  //Добавляем таск в массив
  localStorage.setItem("contact", JSON.stringify(data));
  // обновлённый массив преобразовываем в JSON и отправляем в localStorage
  console.log(data);
}
//
function createElementStorage() {
  if (!localStorage.getItem("contact")) {
    //проверка на наличие данных в localStorage
    localStorage.setItem("contact", "[]");
    // если нет,то добавляем пустой массив
  }

  let newsocks = JSON.parse(localStorage.getItem("contact"));
  //   console.log("aaa", newsocks);
  //стягивание масива из localStorage
  ul.innerHTML = ""; // удаляем все преведущие элементы из списка
  newsocks.forEach((item, index) => {
    // console.log(item.task);
    //перебираем массив с элементами,где item - это каждый таск(обьект)
    let div = document.createElement("div");
    div.style.textAlign = "center";
    div.style.marginTop = "20px";

    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    let img = document.createElement("img");
    let li = document.createElement("li");

    img.setAttribute("src", item.img);
    li.innerText = `
      ${item.name} 
      ${item.email}
    `;

    btnDelete.innerText = "Delete";
    btnDelete.addEventListener("click", () => {
      deleteEl(index);
    });

    btnEdit.innerText = "Edit";
    btnEdit.addEventListener("click", () => {
      editEl(index);
    });

    div.append(img);
    div.append(li);
    div.append(btnDelete);
    div.append(btnEdit);

    ul.append(div);
    // console.log(ul);
  });
}
createElementStorage();

function deleteEl(index) {
  //   console.log(index);
  let dan = JSON.parse(localStorage.getItem("contact"));
  dan.splice(index, 1);
  localStorage.setItem("contact", JSON.stringify(dan));

  createElementStorage();
}
let mainModal = document.querySelector(".main-modal");
let inputEdit = document.querySelector(".inp-edit");
let inputEdit2 = document.querySelector(".inp-edit2");
let inputEdit3 = document.querySelector(".inp-edit3");

let btnCloser = document.querySelector(".btn-closer");

function editEl(index) {
  mainModal.style.display = "block";
  let socks = JSON.parse(localStorage.getItem("contact"));
  inputEdit.setAttribute("id", index);
  inputEdit.value = socks[index].name;
  inputEdit2.value = socks[index].email;
  inputEdit3.value = socks[index].img;
}
let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", () => {
  let editinp = document.querySelector(`.inp-edit`);
  let editinp2 = document.querySelector(`.inp-edit2`);
  let editinp3 = document.querySelector(`.inp-edit3`);

  // <input type="text" class="inp-edit" />
  // <input type="email" class="inp-edit2" />
  // <input type="" class="inp-edit3" />
  let newSocks = JSON.parse(localStorage.getItem("contact"));
  let index = inputEdit.id;
  if (
    !editinp.value.trim() ||
    !editinp2.value.trim() ||
    !editinp3.value.trim()
  ) {
    // проверка на заполненость полей в модальном окне
    alert("заполните пустые ячейки");
    return;
  }
  let newSocks2 = {
    name: inputEdit.value,
    email: inputEdit2.value,
    img: inputEdit3.value,
  };
  newSocks.splice(index, 1, newSocks2);
  localStorage.setItem("contact", JSON.stringify(newSocks));
  mainModal.style.display = "none";
});
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
