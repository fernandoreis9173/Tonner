class Tonner{
    constructor(id,serial,fabricante,modelo,local,quantidade,dt_cadastro,dt_atualizacao){
        this.id = id;
        this.serial = serial;
        this.fabricante = fabricante;
        this.modelo = modelo;
        this.local = local;
        this.quantidade = quantidade;
        this.dt_cadastro = dt_cadastro;
        this.dt_atualizacao = dt_atualizacao;
    }
}

module.exports = Tonner