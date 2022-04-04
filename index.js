const addBtn = document.getElementById('add')

const modeBtn = document.getElementById('mode')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {

    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

modeBtn.addEventListener('click', () => changeBackground())

function addNewNote(text = '') {

    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="delete"><i class="fa fa-times" aria-hidden="true"></i></button>       
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        update()
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        update()
    })

    document.body.appendChild(note)
}

function update() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

function changeBackground(){

    var element = document.body;
    element.classList.toggle("light-mode");

    var current_color =modeBtn.style.backgroundColor;

    if(current_color == 'black'){
        modeBtn.style.backgroundColor = '#c5c21f';
    }else{
        modeBtn.style.backgroundColor = 'black';
    }   
    
}