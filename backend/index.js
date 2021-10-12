var express = require("express")
var app = express()
var router = require("./routes/routes")
var cors = require('cors');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()); // Permite requisições dentro do localhost

app.use("/",router);

app.listen(8080,() => {
    console.log("Servidor rodando")
});
