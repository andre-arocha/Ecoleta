// npm = node packed manager
// $ npm init -y = trafromar uma pasta simples em um projeto 

const express = require("express")
const server = express()

// Configurar pasta publica
server.use(express.static("public")) 


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos da minha apliacação
// Página inicial
server.get("/", (req, res) => { // ROTA
    // rec : Requisição
    // res : Resposta   
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos." })
})

server.get("/create-point", (req, res) => { // ROTA
    // rec : Requisição
    // res : Resposta   
    return res.render("create-point.html")
    
})

server.get("/search-results", (req, res) => { // ROTA
    // rec : Requisição
    // res : Resposta   
    return res.render("search-results.html")
    
})


// Ligar o Servidor
server.listen(3000) // INICIAR O SERVIDOR

