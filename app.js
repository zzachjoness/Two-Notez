const screenNotes = document.querySelector(".screen-notes");
const dockNotes = document.querySelector(".dock-notes");
var noteCount = localStorage.length;
// Using localStorage.setItem()
checkStorage(noteCount);
console.log(noteCount);

function checkStorage(count) {
  if (count > 0) {
    updateHtml(count);
  } else {
  }
}

function updateHtml(count) {
  screenNotes.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    screenNotes.innerHTML = localStorage[i] + screenNotes.innerHTML;
  }
}

dockNotes.addEventListener("click", function (evt) {
  let nodeValue = evt.srcElement.attributes[0].nodeValue;
  if (nodeValue !== "dock-notes") {
    updateHtml(noteCount);
    noteCount++;
    var date = new Date();
    var color = nodeValue;
    screenNotes.innerHTML =
      createNote(date, color, noteCount, "") + screenNotes.innerHTML;
    document.getElementById(`textArea-${noteCount}`).focus();
  }
});

function createNote(date, color, noteCount, updateValue) {
  /* i am having an issues with object functionality, localStorage will not hold an object and JSON.stringify() + JSON.Parse() functionality are blocked
  
  var note = document.createElement("div");
  note.setAttribute("class", `note ${color}`);
  note.setAttribute("id", `note-${noteCount}`);
  note.innerHTML = `<textarea id="textArea-${noteCount}" placeholder="Your memory isn't what it used to be" value=""></textarea>
  <div class="note-footer"><h1>${date.toLocaleString()}</h1>
  <button class="note-edit" id="${noteCount}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
  </button></div>`;

  */
  var note = `<div class="note ${color}" id="note-${noteCount}"><textarea id="textArea-${noteCount}" placeholder="Your memory isn't what it used to be" type="text" value="">${updateValue}</textarea>
                <div class="note-footer"><h1>${date.toLocaleString()}</h1>
                <button class="note-edit" id="${noteCount}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button></div></div>`;
  localStorage.setItem(`${noteCount}`, note);
  return note;
}
/*
function noteEdit(count) {
  let noteEdit = document.getElementById(`textArea-${count}`);
  noteEdit.disabled = !noteEdit.disabled;
  noteEdit.focus();
}
*/
function initiateUpdateNote() {}
function updateNote(data, value) {
  console.log(data);
  let selectedNote = Number(data.toString().slice(9));
  console.log(data);
  console.log(value);
  console.log(selectedNote);
  console.log(localStorage[selectedNote]);
}

screenNotes.addEventListener("click", function (evt) {
  let clickedEle = evt.path;
  if (clickedEle.length > 7) {
    console.log(this);
  }
});

screenNotes.addEventListener("keydown", function (evt) {
  let userInput = evt.key;
  let source = evt.srcElement;
  var date = new Date();
  let selectedNote = source.id.slice(9);
  let selectedColor = getColor(localStorage[selectedNote]);
  if (userInput.length === 1) {
    createNote(date, selectedColor, selectedNote, source.value + userInput);
  }
});

function getColor(selectedNote) {
  let firstColorLetter = selectedNote.slice(17, 18);
  let selectedColor = "";
  switch (firstColorLetter) {
    case "o":
      selectedColor = "orange";
      break;
    case "y":
      selectedColor = "yellow";
      break;
    case "g":
      selectedColor = "green";
      break;
    case "b":
      selectedColor = "blue";
      break;
    case "p":
      selectedColor = "purple";
      break;
  }
  return selectedColor;
}
