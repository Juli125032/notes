document.addEventListener("DOMContentLoaded", () => {
  getNotes();
});

document.querySelector("#open-form").addEventListener("click", openForm);
document.querySelector("#form-note").addEventListener("click", (ev) => {
  validateForm(ev);
});

function getNotes() {
  const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
  let html = "";
  document.querySelector("#notes").innerHTML = "";
  if (localNotes.length > 0) {
    localNotes.forEach((note) => {
      html += `<div class="card ${note.color}">
                    <div class="card-header">
                        <p class="card-title">${note.title}</p>
                    </div>
                    <div class="card-body">
                        <p class="card-title">${note.description}</p>
                    </div>
                    <div class="card-footer">
                        <div class="car-actions">
                            <button onclick="editNote()" id="edit-button" index="${note.id}" class="button-primary edit-button">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onclick="removeNote()" id="delete-button" index="${note.id}" class="button-primary edit-button">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
    });
    document.querySelector("#notes").insertAdjacentHTML("afterbegin", html);
  }
}

function addNote() {
  const idEdit = document.querySelector("#idNote").value;
  if (idEdit) {
    removeNote(parseInt(idEdit));
  }

  const arr = JSON.parse(localStorage.getItem("notes")) || [];
  const title = document.querySelector("#input-title").value;
  const description = document.querySelector("#input-description").value;
  const color = document.querySelector("#color").value;
  const id = arr ? arr.length : 0;

  const bodyNote = {
    id: parseInt(idEdit) || id,
    title,
    description,
    color,
  };

  let data = [...arr, bodyNote];
  localStorage.setItem("notes", JSON.stringify(data));
  getNotes();
  closeForm();
}

function openForm() {
  document.querySelector("#modal-add").style.visibility = "visible";
}

function validateForm(ev) {
  ev.preventDefault();
  const click = ev.target.id;
  if (click == "close-form") {
    closeForm();
  }
  if (click == "new-note") {
    addNote();
  }
}

function removeNote() {
  const id = document.querySelector("#delete-button").getAttribute("index");
  const arr = JSON.parse(localStorage.getItem("notes"));
  const remainingArr = arr.filter((data) => data.id != id);
  localStorage.setItem("notes", JSON.stringify(remainingArr));
  getNotes();
}

function editNote() {
  const id = document.querySelector("#delete-button").getAttribute("index");
  const arr = JSON.parse(localStorage.getItem("notes"));
  const noteEdit = arr.filter((data) => data.id == id)[0];
  document.querySelector("#input-title").value = noteEdit.title;
  document.querySelector("#input-description").value = noteEdit.description;
  document.querySelector("#idNote").value = noteEdit.id;
  openForm();
}

function closeForm(ev) {
  document.querySelector("#modal-add").style.visibility = "hidden";
  const title = (document.querySelector("#input-title").value = "");
  const description = (document.querySelector("#input-description").value = "");
  const color = document.getElementsByName("color").forEach((color) => {
    color.checked = false;
  });
}
