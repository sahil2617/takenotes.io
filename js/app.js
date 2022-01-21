console.log("app.js is working");
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    // console.log(addTxt);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {

        html += `       <div class=" my-3 mx-3 noteCard" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick=deleteNotes(this.id) class="btn btn-primary">Delete Notes</button>
                        </div>
                        </div>
        `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {

        notesElm.innerHTML = html;

    }
    else {
        notesElm.innerHTML = `<h2>Couldn't find any Notes, Add Notes to show</h2>`;

    }

}
// CODE FOR WORKING OF THE DELETE BUTTON
function deleteNotes(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}


// CODE FOR WORKING OF THE SEARCH BAR
let search = document.getElementById('searchBar');
search.addEventListener('input', function (e) {

    inputValue = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    // console.log(noteCard)
    Array.from(noteCard).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();

        if (cardTxt.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })

})