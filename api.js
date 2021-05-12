var Db = require('./db/dboperations');
var tonner = require('./tonner')
const dboperations = require('./db/dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})
//ROTA PARA LISTAR TODAS AS APIs
router.route('/tonners').get((request, response)=>{
    dboperations.gettonners().then(result =>{
        response.json(result[0]);
    })
})

//ROTA PARA LISTAR API PELO ID
router.route('/tonners/:id').get((request, response) => {
    dboperations.gettonner(request.params.id).then(result => {
        response.json(result[0]);
    })
})

//ROTA DE DELETAR API PELO ID
router.route('/tonners/:id').delete((request, response) => {
    dboperations.deleteTonner(request.params.id).then(result => {
        response.json(result[0]);
    })
})

//ROTA DE ALTER TONNER PELO ID
router.route('/tonners/:id').patch((request, response) => {
    dboperations.alterTonner(request.body).then(result => {
        response.json(result[0]);
    })
})

//ROTA PARA ADICIONAR API
router.route('/tonners').post((request, response) => {
    let tonner = {...request.body}

    dboperations.addTonner(tonner).then(result => {
        response.status(201).json(result);
    })
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is running at ' + port);