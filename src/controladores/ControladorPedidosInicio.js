const MSJ = require('../componentes/mensaje');
const { validationResult } = require('express-validator');
function validacion (req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    
    if(validaciones.errors.length > 0)
    {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La peticion no se ejecuto';
        msj.errores = errores;
        //msj.mensaje='Debe escribir todos los campos';
    }
    return msj;
};
exports.Iniciodetallepedido = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "detallepedido", 
            rutas: [
                {
                    ruta: "/api/detallepedido/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de detalle pedido"
                },
                {
                    ruta: "/api/detallepedido/guardar",
                    metodo: "post",
                    parametros:{
                        NumeroPedido: "Nombre del pedido. Obligatorio.valor entero",
                        CodigoProducto: "Numero que identifica de que pedido pertenece. Obligatorio.valor varchar",
                        Cantidad: "Cantidad de producto que pidio en el pedido. Obligatorio.valor entero",
                        Cancelado: "Valor booleano que indica si el detalle del pedido fue cancelado",
                        Notas: "valor TEXT para agregar notas del cliente",
                        Elaborado: "Valor booleano que indica si el detalle del pedido fue elaborado",
                        Entregado: "Valor booleano que indica si el detalle del pedido fue Entregado",
                        Facturado: "Valor booleano que indica si el detalle del pedido fue Facturado",
                        subproducto: "Codigo del subproducto.valor entero"
                    },
                    descripcion: "Guarda todos los detalles pedidos"
                },
                { 
                    ruta: "/api/detallepedido/modificar",
                    metodo: "put",
                    parametros:{
                        idregistro: "numero que identifica el detalle del pedido.obligatorio",  
                        NumeroPedido: "Numero que identifica de que pedido pertenece. Obligatorio.valor entero",
                        CodigoProducto: "Codigo del producto. Obligatorio.valor varchar",
                        Cantidad: "Cantidad de producto que pidio en el pedido. Obligatorio.valor entero",
                        Cancelado: "Valor booleano que indica si el detalle del pedido fue cancelado",
                        Notas: "valor TEXT para agregar notas del cliente",
                        Elaborado: "Valor booleano que indica si el detalle del pedido fue elaborado",
                        Entregado: "Valor booleano que indica si el detalle del pedido fue Entregado",
                        Facturado: "Valor booleano que indica si el detalle del pedido fue Facturado",
                        subproducto: "Codigo del subproducto.valor entero"
                    },
                    descripcion: "Modifica los detalles pedidos"
                },
                { 
                    ruta: "/api/detallepedido/pedido_elaborado",
                    metodo: "put",
                    parametros:{
                        idregistro: "numero que identifica el detalle del pedido.obligatorio",  
                        NumeroPedido: "Numero que identifica de que pedido pertenece. Obligatorio.valor entero",
                        usuario: "valor entero que identifica el usuario que realiza la entrega del pedido. Obligatorio",
                        Elaborado: "Valor booleano que indica si el detalle del pedido fue elaborado.obligatorio"
                    },
                    descripcion: "Llena la tabla de pedidos elaborados, minetras cambia el estado del valor de elaborado"
                },
                { 
                    ruta: "/api/detallepedido/pedido_entregado",
                    metodo: "put",
                    parametros:{
                        idregistro: "numero que identifica el detalle del pedido.obligatorio",  
                        NumeroPedido: "Numero que identifica de que pedido pertenece. Obligatorio.valor entero",
                        usuario: "valor entero que identifica el usuario que realiza la entrega del pedido. Obligatorio",
                        Entregado: "Valor booleano que indica si el detalle del pedido fue Entregado.entregado",
                        identrega: "valor de id de la entrega",
                    },
                    descripcion: "Llena la tabla de pedidos entragados, minetras cambia el estado del valor de entregado"
                },
                { 
                    ruta: "/api/detallepedido/cancelar_pedido",
                    metodo: "put",
                    parametros:{
                        idregistro: "numero que identifica el detalle del pedido.obligatorio",  
                        NumeroPedido: "Numero que identifica de que pedido pertenece. Obligatorio.valor entero",
                        usuario: "valor entero que identifica el usuario que realiza la entrega del pedido. Obligatorio",
                        Cancelado: "Valor booleano que indica si el detalle del pedido fue cancelado",
                    },
                    descripcion: "Llena la tabla de pedidos cancelados, minetras cambia el estado del valor de cancelado"
                },
                { 
                    ruta: "/api/detallepedido/modificar_facturados",
                    metodo: "put",
                    parametros:{
                        idregistro: "numero que identifica el detalle del pedido.obligatorio",  
                        NumeroPedido: "Numero que identifica de que pedido pertenece. Obligatorio.valor entero",
                        Facturado: "Valor booleano que indica si el detalle del pedido fue Facturado",
                    },
                    descripcion: "cambia el estado del valor de facturado"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Sofia Ramirez",
        colaboradores: "Erick Moncada",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciopedido = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { modulo: "pedidos", ruta: "/api/pedidos"},
        { modulo: "detalle pedido", ruta: "/api/detallepedido"},
        { modulo: "entrega pedido", ruta: "/api/entregapedidos"},
        { modulo: "pedidos cancelados", ruta: "/api/pedidoscancelados"},
        { modulo: "pedidos elaborados", ruta: "/api/pedidoselaborados"},
        { modulo: "pedidos llevar", ruta: "/api/llevarpedidos"},
        { modulo: "pedidos mesa", ruta: "/api/pedidosmesa"},
        { modulo: "pedidos x ventas", ruta: "/api/pedidosxventas"},
        { 
            modulo: "pedido", 
            rutas: [
                {
                    ruta: "/api/pedidos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedido"
                },
                {
                    ruta: "/api/pedidos/guardar",
                    metodo: "post",
                    parametros:{
                        idmesero: "Numero que identifica al mesero. Obligatorio.valor entero",
                        Estacion: "Numero que identifica la estacion. Obligatorio.valor entero",
                        activo: "Valor booleano que indica si el pedido esta activo",
                        modalidad: "Valor ENUM('ME', 'DO', 'LL').obligatoria",
                        estado: "valor ENUM('AAA', 'NNN', 'SNN', 'SSN', 'NNS', 'SNS', 'SSS', 'NSS', 'NSN')"
                    },
                    descripcion: "Guarda el pedido"
                },
                { 
                    ruta: "/api/pedidos/modificar",
                    metodo: "post",
                    parametros:{
                        NumeroPedido: "numero que identifica el pedido.obligatorio",
                        idmesero: "Numero que identifica al mesero. Obligatorio.valor entero",
                        Estacion: "Numero que identifica la estacion. Obligatorio.valor entero",
                        activo: "Valor booleano que indica si el pedido esta activo",
                        modalidad: "Valor ENUM('ME', 'DO', 'LL').obligatoria",
                        estado: "valor ENUM('AAA', 'NNN', 'SNN', 'SSN', 'NNS', 'SNS', 'SSS', 'NSS', 'NSN')"
                    },
                    descripcion: "Modifica el pedido"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Julio Velasquez",
        colaboradores: "German Ordoñez",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Inicioentregapedido = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "entrega pedido", 
            rutas: [
                {
                    ruta: "/api/entregapedidos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de entrega pedido"
                },
                {
                    ruta: "/api/entregapedidos/guardar",
                    metodo: "post",
                    parametros:{
                        iddetalle_pedido: "valor entero que identifica a que detalle de pedido pertenece. Obligatorio",
                        usuario: "valor entero que identifica el usuario que realiza la entrega del pedido. Obligatorio",
                        identrega: "valor de id de la entrega",
                    },
                    descripcion: "Guarda la entrega del pedido"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "German Ordoñez",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciopedidoscancelados = async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "pedidos cancelados", 
            rutas: [
                {
                    ruta: "/api/pedidoscancelados/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos cancelados"
                },
                {
                    ruta: "/api/pedidoscancelados/guardar",
                    metodo: "post",
                    parametros:{
                        numeropedido: "valor entero que identifica a que detalle de pedido pertenece. Obligatorio",
                        usuario: "valor entero que identifica el usuario que realiza la entrega del pedido. Obligatorio"
                    },
                    descripcion: "Guarda los pedidos cancelados"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Alejandro Zuniga",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciollevarpedidos= async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "llevar pedidos", 
            rutas: [
                {
                    ruta: "/api/llevarpedidos/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos llevar"
                },
                {
                    ruta: "/api/llevarpedidos/guardar",
                    metodo: "post",
                    parametros:{
                        idpedido: "valor entero que identifica a que pedido pertenece. Obligatorio",
                        idcliente: "valor entero que identifica el cliente que realiza pedido. Obligatorio"
                    },
                    descripcion: "Guarda los pedidos que son para llevar"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "German Ordoñez",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciopedidoselaborados= async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "pedidos elaborados", 
            rutas: [
                {
                    ruta: "/api/pedidoselaborados/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos elaborados"
                },
                {
                    ruta: "/api/pedidoselaborados/listar",
                    metodo: "post",
                    parametros:{
                        iddetallepedido: "valor entero que identifica a que detalle pedido pertenece. Obligatorio",
                        idusuario: "valor entero que identifica el usuario que elabora el pedido. Obligatorio"
                    },
                    descripcion: "Guarda los pedidos que son elaborados"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Alejandro Zuniga",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciopedidoselaborados= async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "pedidos elaborados", 
            rutas: [
                {
                    ruta: "/api/pedidoselaborados/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos elaborados"
                },
                {
                    ruta: "/api/pedidoselaborados/listar",
                    metodo: "post",
                    parametros:{
                        iddetallepedido: "valor entero que identifica a que detalle pedido pertenece. Obligatorio",
                        idusuario: "valor entero que identifica el usuario que elabora el pedido. Obligatorio"
                    },
                    descripcion: "Guarda los pedidos que son elaborados"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Alejandro Zuniga",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};

exports.Iniciopedidosmesa= async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "pedidos mesa", 
            rutas: [
                {
                    ruta: "/api/pedidosmesa/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos elaborados"
                },
                {
                    ruta: "/api/pedidosmesa/guardar",
                    metodo: "post",
                    parametros:{
                        idpedido: "valor entero que identifica a que pedido pertenece. Obligatorio",
                        idmesa: "valor entero que identifica a que mesa pertenece. Obligatorio",
                        cuenta: "valor entero que nos dice la cuenta. Obligatorio",
                        nombrecuenta: "valor varchar(45) del nombre de la cuenta. Obligatorio",
                    },
                    descripcion: "Guarda los pedidos de mesa"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Erick Moncada",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};


exports.Iniciopedidosxventas= async (req, res)=>{
    var msj = validacion(req);
    const listaModulos = 
    [
        { 
            modulo: "pedidos mesa", 
            rutas: [
                {
                    ruta: "/api/pedidosxventas/listar",
                    metodo: "get",
                    parametros:"",
                    descripcion: "Listar el modulo de pedidos elaborados"
                },
                {
                    ruta: "/api/pedidosxventas/guardar",
                    metodo: "post",
                    parametros:{
                        NumeroFactura: "valor entero que identifica a que factura pertenece. Obligatorio",
                        NumeroPedido: "valor entero que identifica a que pedido pertenece. Obligatorio",
                    },
                    descripcion: "Guarda los pedidos ventas"
                }
            ],
        }          
    ];
    const datos = {
        api: "API-SIFCON",
        descripcion: "Interfaz de progamación para el sistema de facturacion contable",
        propiedad: "GRUPO 1",
        desarrollador: "Erick Moncada",
        colaboradores: "",
        fecha: "24/06/2022",
        listaModulos
    };
    msj.datos=datos;
    MSJ(res, 200, msj);
};
