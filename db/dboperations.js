var config = require('./dbconfig');
const sql = require('mssql');
const { server } = require('./dbconfig');

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
        const {fabricante,modelo,local, quantidade } = adicionatonner
        let pool = await sql.connect(config);
        let product = await pool.request()
        .query(`EXECUTE DBO.PROC_ATUALIZA_TONNER 
        @fabricante= '${fabricante}',
        @modelo= '${modelo}',
        @local= '${local}',
        @quantidade= ${quantidade}
    
    `)
        // .query("UPDATE tonner SET serial = @input_parameter where id = @input_parameter");
        return product;
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
        const { id,fabricante,modelo,local,quantidade } = alteratonner
        let pool = await sql.connect(config);
        let product = await pool.request()
            .query(`EXECUTE DBO.PROC_ATUALIZA_TONNER 
                @ID = ${id},
                @fabricante= '${fabricante}',
                @modelo= '${modelo}',
                @local= '${local}',
                @quantidade= ${quantidade}
            
            `)
        return product;
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