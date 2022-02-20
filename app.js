const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Text to be inserted on the Note',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Creating remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title:{
            describe: 'Title of the Note to be removed',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'Listing all the notes',
    handler(){
        notes.listNotes()
    }
})

//Creating read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title:{
            describe: 'Title of the Note to be readed',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// add, remove, read, list
yargs.parse()
