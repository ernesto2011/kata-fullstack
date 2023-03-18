const express = require('express')
const app = express()
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql');
const {books} = require('./data.json')



const schema = buildSchema(`
    type Query{
        getWelcome: String
        getAge: Int
        getPersonalInfo(name:String, age: Int): String
        getBooks: [Book]
    }

    type Mutation{
        addBook(id: Int, title:String, author:String):[Book]
        updateBook(id: Int, title:String, author:String): Book
        deleteBook(id: Int): [Book]
    }

    type Book{
        id: Int
        title: String
        author: String
    }
`)


function getWelcome(){
    return 'hola mundo!!'
}
function getAge(){
    return 19
}
function getPersonalInfo(args){
    return 'hello ' + args.name + " your age is: " + args.age
}
function getBooks(){
    return books
}
function addBook({id, title, author}){
    //insertar el objeto en el arreglo de libros
    books.push({id: id, title:title, author: author})
    //retornar los libros
    return books
}
function updateBook({id, title, author}){
    //encontrar libro
    var bookFounded = books.find(book => {
        if (book.id === id) {
            book.title = title ? title : book.title
            book.author = author ? author : book.author
        }
        return book
    })
    console.log('after find', bookFounded);
    return bookFounded
    //actualizar la informacion

    //retornar el libro actualizado
}

function deleteBook({id}){
    
    books.pop({id:id})
    return books
}

const root = {
    //Propiedades de schema/ funciones que resolveran esos metodos
    getWelcome: getWelcome,
    getAge: getAge,
    getPersonalInfo: getPersonalInfo,
    getBooks,
    addBook,
    updateBook,
    deleteBook
}

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3001,() => {
    return console.log(
        'Server is running!'
    );
})