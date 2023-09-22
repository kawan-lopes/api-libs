let obj = 
    {
        "id": "33f94177-3c80-4aba-957b-b431421286ec",
        "name": "tal nome",
        "description": "essa lib faz tal coisa",
        "tecnologia": "nodejs",
        "logo": "http://soacy.com/arquivos/libs/logo"
    }



const mudar = {"name": "teste", "tecnologia": "bla bla"};

let objNv = mudar.map(function(valorMudar, index){
    let teste = valorMudar[index]
    obj = { ...obj, name}
    console.log(teste)
    // obj.map(function(item){
    
    // });
})
