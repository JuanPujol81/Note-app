const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

//////////Add a note to the notes.json file
const addNote = (title, body) => {
    
    debugger
    
    const notes = loadNotes()
    const titleTaken = notes.find((note) => note.title === title)
    if(titleTaken === undefined){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note Aded'))
    }else{
        console.log(chalk.red.inverse('Title taken :' + title))
    }
}

//////////Remove a note from the notes.json file
const removeNote = title => {
    const notes = loadNotes()
    const newArray = notes.filter(element => element.title != title)

    if(newArray.length == notes.length)
        console.log(chalk.red.inverse('No note found!'))
    else{
        saveNotes(newArray)
        console.log(chalk.green.inverse('Note removed!'))
    }
        
}

///////Search for the match title of the notes and printed on screen
const readNote = (title) => {
    const notesArray = loadNotes()
    const noteToRead = notesArray.find(note => note.title === title)
    if(noteToRead === undefined)
        console.log(chalk.red.bold('No Note Was Found'))
    else{
        console.log(chalk.underline.white.bold.inverse(noteToRead.title + ': '))
        if(noteToRead.body)
            console.log(chalk.white.inverse(noteToRead.body))
    }
}

///////////Listed all the notes and print them on the console
const listNotes = () => {
    const notesListed = loadNotes()
    console.log(chalk.green.inverse('Your notes:'))
    notesListed.forEach(element => {
        console.log(chalk.yellow.inverse('Note Title: ' + element.title))
        if(element.body)
            console.log(chalk.grey.inverse(element.body))
        })
}

//////////Replace the notes.json file content with notes content
const saveNotes = (notes) => {
        const newBookJson = JSON.stringify(notes)
        fs.writeFileSync('notes.json' , newBookJson)
}

//////////Extract all the content from the notes.json file
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}