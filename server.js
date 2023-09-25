const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");
const app = express();
const cors = require('cors');
let libs = [];

fs.readFile("./db.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    } else{
        libs = JSON.parse(data)
    }
})
app.use(cors({
    origin: '*'
}));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('static'))

// use
app.use(express.json());
// middleware that is specific to this router
app.use((req, res, next) => {
    console.log("alguem acessou API")
    next()
})

// rotas
app.get("/", (req, res) => {
   res.json(libs);
})
app.get('/about', function (req, res){
    res.render('about.html');
});
app.get("/:id", (req, res) => {

    const { id } = req.params;

    const libIndex = libs.findIndex(lib => lib.id === id);
    if(libIndex == '-1'){
        return res.status(409).json({message: "esse ID nao esta cadastrado, por favor insira um ID existente!"})
    }
    res.json(libs[libIndex]);
 })

app.post("/", (req, res) => {

    const { name, description, technology, image, link } = req.body;
    const lib = {
    id: randomUUID(),
    name,
    description,
    technology,
    image,
    link
  };
  libs.push(lib);
  saveDate();
  return res.json([{
    message: "lib cadastrada com sucesso com sucesso: "}, lib])
})


app.delete("/:id", (req, res) => {
    const { id } = req.params;
    const libIndex = libs.findIndex(lib => lib.id === id);
    if(libIndex == '-1'){
        return res.status(409).json({message: "esse ID nao esta cadastrado, por favor insira um ID existente!"})
    }
    libs.splice(libIndex, 1);
    saveDate();
    return res.json({ message: "lib excluida"})

})

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, technology, image, link } = req.body;
    const libIndex = libs.findIndex(lib => lib.id === id);
    if(libIndex == '-1'){
        return res.status(409).json({message: "esse ID nao esta cadastrado, por favor insira um ID existente!"})
    }

    if(name != undefined){
        libs[libIndex] = {
            ...libs[libIndex],
            name
        }
    }
    if(description != undefined){
        libs[libIndex] = {
            ...libs[libIndex],
            description
        }
    }
    if(technology != undefined){
        libs[libIndex] = {
            ...libs[libIndex],
            technology
        }
    }
    if(image != undefined){
        libs[libIndex] = {
            ...libs[libIndex],
            image
        }
    }
    if(link != undefined){
        libs[libIndex] = {
            ...libs[libIndex],
            link
        }
    }
    console.log(libIndex)
    saveDate();
    return res.json([{message: "lib editado"},libs[libIndex]])
  })



function saveDate(){
    fs.writeFile("./db.json", JSON.stringify(libs), (err) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("Database salva em memoria")
        }
    })
}

app.listen(3003, () => console.log("rodando na port 3003"));
