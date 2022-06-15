

const esAdminRole = (req, res, next) => {
    if(!req.usuario){
        return res.status(500).json({ // internal server error
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const {rol,nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no tiene el rol de administrador`
        })
    }
    next();
}
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({ // internal server error
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({ // unauthorized
                msg: `El usuario ${req.usuario.nombre} requiere uno de estos roles : ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,tieneRole
}