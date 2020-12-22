# semana-4-100

1. Se crea un proyecto nuevo en Sequelize y se importa express en el index principal, se crea constancia express llamada "app" en donde vivirà toda la aplicación, también se llamará a la carpeta rutas y se creará el app.listen(numero del puerto) para que al correr la app, lo haga en el puerto que definamos, por defecto, se colocaría el puerto 3000. Es necesario crear la ruta de entrada de la siguiente forma: app.use('/api', apiRouter)
2. Se instala morgan con el fin de poder identificar peticiones que se hagan a travès de la consola y se hace el llamado: app.use(morgan('dev'));
3. Se crea una ruta de ingreso a la raìz de la pàgina de la siguiente forma: app.get('/')
4. Se crea la carpeta "models" en donde se ecnontrará un index.js que se encargará de manejar los modelos, también se crean los diferentes modelos, empezando por el modelo "usuario" (se crea el archivo usuario.js).
5. Dentro del archivo usuario.js, se coloca la estructura que deberá tener la tabla que deseamos crear, colocando cada campo que necesitamos y su tipo, en este caso, si el campo es de tipo STRING o INTEGER. Las columnas que se crearán son: rol, nombre, estado, email y password. De la misma forma, se crean los modelos "articulo.js" y "categoria.js". Al final de cada modelo se coloca: module.exports={nombre del modelo}
    - const {
        Model
        } = require('sequelize');
        module.exports = (sequelize, DataTypes) => {
        class Usuario extends Model {
            <!-- 
            Helper method for defining associations.
            This method is not a part of Sequelize lifecycle.
            The `models/index` file will call this method automatically.
             -->
            static associate(models) {
            // define association here
            }
        };
        Usuario.init({
            rol: DataTypes.STRING,
            nombre: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            estado: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'Usuario',
        });
        return Usuario;
        };
6. Se crea carpeta routes y un archivo index.js dentro de la carpeta
8. Dentro del archivo index se llama a express: const router = require('express').Router():
    - Se crean las rutas que usaremos, P.Ej: "router.use('/usuario', usuarioRouter);"
    - Se importa la ruta de la siguiente forma: const usuarioRouter = require('./api/usuario'), por lo    tanto, dentro de routes se crea una carpeta api y allí dentro un archivo usuario.js.
9. Dentro de usuario.js (el archivo de la carpeta api), se crean todas las rutas que tendrá la ruta "/usuario", P.Ej: router.post('/login', userController.login) ó router.get('/list', auth.verificarVendedor, userController.list). Es importante mencionar que "auth.verificarVendedor" significa que un vendedor es el único que puede listar a los usuarios, y "userController.login" hace referencia a que la ruta está asociada a ese controlador.
10. Se crea una carpeta "services" y adentro un archivo token.js, cada vez que un usuario se logueé en el sistema, se generará un token, la lógica es la siguiente:

    module.exports = {
    <!-- Recibe un usuario, a continuación siguen los campos que anteriormente definimos crear en la tabla usuario -->
    encode: (user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            status: user.estado
        }, 'config.secret', {
            expiresIn: 86400,
        });

        return token;
     <!-- Esta lógica nos retorna un token que tendrá una duración de un (1) día, es decir, 86400 segundos -->   
    },
     <!-- Recibe el token -->
    decode: async (token) => {

        try {
    <!-- Campos únicos del usuario, el id o el email. Se hace la decodificación
        config.secret es la frase secreta
        Verifica si el token tiene el campo id y devuelve el id -->
            
            const {id} = await jwt.verify(token, 'config.secret' );
    
    <!-- Aquí consulta a la base de datos si el usuario existe -->
                
                const user = await models.Usuario.findOne({where: {
                    id: id,
                    estado: 1
                }});
               
                //Si el usuario existe retorna el user
                if(user)
                {
                    return user;
                }
                else
                {
                    return false;
                }
        } catch (error) {
                    return error;
                }

            }
        }

11. Debido a que en las rutas se crearon verificaciones para cada una de ellas, que validaban si el administrador o el vendedor podía acceder a esas rutas, se crea una carpeta middlewares y adentro un archivo auth.js, ahí pondremos la siguiente lógica:

    verificarAdministrador: async(req, res, next) => {
        <!-- Recibe el token que se generó en el login y verifica si el rol de la persona que se logueo es "Administrador" -->
        const respuesta = await tokenServices.decode(req.headers.token);

            if(respuesta.rol === "Administrador")
            {
                next();
            }
            else
            {
                return res.status(403).send({
                    message: 'Usuario no autorizado'
                });
            }
    },

    verificarVendedor: async(req, res, next) => {
        try{
            <!-- Verifica si el token corresponde a un administrador o vendedor debido a que el administrador tiene los mismos permisos del vendedor, pero el vendedor no cuenta con los mismos permisos del administrador -->
                const respuesta = await tokenServices.decode(req.headers.token);

                if(respuesta.rol === "Vendedor" || respuesta.rol === "Administrador")
                {
                    next();
                }
                else
                {
                    return res.status(403).send({
                        message: "Usuario no autorizado"
                    });
                }
            } catch (error){
                
            }

        }

12. Se crea la carpeta controllers, en donde estarán los controladores de cada modelo (usuario, categoria, articulo), creamos el archivo UserController.js y allí pondremos la lógica para cada método creado: list, activate, deactivate, update, add (en el caso de articulo y categoria), login(para usuario) y register(para usuario). Cada modelo deberá tener su propio archivo de controladores.
