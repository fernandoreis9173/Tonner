var config = require('./dbconfig');
const sql = require('mssql');

//LISTA TODOS OS REGISTRO DA TABELA
async function gettonners() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * FROM tonner");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// LISTA REGISTRO CONFORME ID
async function gettonner(tonnerId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, tonnerId)
            .query("SELECT * from tonner where Id = @input_parameter");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//ADICIONA OS REGISTROS NO BANCO DE DADOS
async function addTonner(adicionatonner) {
    try {
        console.log(adicionatonner);
        const { id, serial,fabricante,modelo,local, quantidade } = adicionatonner
        let pool = await sql.connect(config);
        let product = await pool.request()
            .query(`insert into tonner (serial, fabricante, modelo, local, quantidade)
             values ('${serial}', '${fabricante}', '${modelo}', '${local}', '${quantidade}')`)
        // .query("UPDATE tonner SET serial = @input_parameter where id = @input_parameter");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// DELETEA OS REGISTRO DO BANCO DE DADOS
async function deleteTonner(deletetonner) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, deletetonner)
            .query("DELETE from tonner where id = @input_parameter");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// ALTERA OS REGISTRO DO BANCO DE DADOS, FALTANDO AJUSTA SQL
async function alterTonner(alteratonner) {
    try {
        console.log(alteratonner);
        const { id, serial,fabricante,modelo,local,quantidade,dt_atualizacao } = alteratonner
        let pool = await sql.connect(config);
        let product = await pool.request()
            .query(`UPDATE tonner SET serial = '${serial}' 
            , fabricante = '${fabricante}'
            , modelo = '${modelo}'
            , local = '${local}'
            , quantidade = '${quantidade}'
            , dt_atualizacao = '${dt_atualizacao}' where id =${id}`)
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    gettonners: gettonners,
    gettonner: gettonner,
    addTonner: addTonner,
    deleteTonner: deleteTonner,
    alterTonner: alterTonner
}