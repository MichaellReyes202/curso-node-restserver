
const {Schema,model} = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo : {
        type: String,
        required : [true, 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type: String,
        required : [true, 'La contraseña es obligatoria']
    },
    img : {
        type: String,
        required : false
    },
    rol : {
        type: String,
        required : [true, 'El rol es obligatorio'],
        //enum : ['ADMIN_ROLE','USER_ROLE']
    },
    estado : {
        type: Boolean,
        default : true
    },
    google : {
        type: Boolean,
        default : false
    }
});

// sobre escritura del metodo toJSON
UsuarioSchema.method('toJSON', function() {
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
})

module.exports = model('Usuario',UsuarioSchema);
