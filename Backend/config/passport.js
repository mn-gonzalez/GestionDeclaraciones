const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const Login = require('../modelos/login');

passport.use(new LocalStrategy({
		campoUsuario: 'rut',
		campoContrasena: 'contrasena' 
	},
	function(rut, contrasena, tipo_usuario, done){
		if(tipo_usuario == 'DEUDOR'){
			Login.obtenerDeudorRut(rut, (error, usuario) => {
				if(error){
					return done(error);
				}
				usuario.verificarContrasenaDeudor(contrasena, (error, resultado) => {
					if(error){
						return done(null, false, {
							mensaje: "Error al inciar sesion"
						});
					}
					if(!resultado){
						return done(null, false, {
							mensaje: "La contraseña es incorrecta"
						});
					}
					return done(null, {
						rut: usuario.rut,
						nombres: usuario.nombres,
						ap_paterno: usuario.ap_paterno,
						ap_materno: usuario.ap_materno
					});
				});
			});
		}
		else if(tipo_usuario == 'FUNCIONARIO'){
			Login.obtenerDeudorFuncionario(rut, (error, usuario) => {
				if(error){
					return done(error);
				}
				usuario.verificarContrasenaFuncionario(contrasena, (error, resultado) => {
					if(error){
						return done(null, false, {
							mensaje: "Error al inciar sesion"
						});
					}
					if(!resultado){
						return done(null, false, {
							mensaje: "La contraseña es incorrecta"
						});
					}
					return done(null, {
						rut: usuario.rut,
						nombres: usuario.nombres,
						ap_paterno: usuario.ap_paterno,
						ap_materno: usuario.ap_materno
					});
				});
			});
		}
	}
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.DECLARACION_JWT_SECRET
    },
    function (jwtPayload, done) {
        //console.log("JWTStrategy %j ", jwtPayload)
        done(null, true);
       
    }
));