const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const Deudor = require('../modelos/deudor');
const Funcionario = require('../modelos/funcionario');

passport.use('login_deudor', new LocalStrategy({
		usernameField: 'rut',
		passwordField: 'contrasena'
	}, 
	function (rut, contrasena, done){
		Deudor.verificar_deudor(rut, (error, deudor) => {
			if(error){
				return done(error);
			}
			deudor.verificar_contrasena(contrasena, (error, resultado) => {
				if(error){
					return done(null, false, {
						mensaje: "Error al iniciar sesion"
					});
				}
				if(!resultado){
					return done(null, false, {
						mensaje: "La contraseña es incorrecta"
					});
				}
				return done(null, {
					rut: deudor.rut,
					nombres: deudor.nombres,
					ap_paterno: deudor.ap_paterno,
					ap_materno: deudor.ap_materno
				});
			});
		});
	}
));

passport.use('login_funcionario', new LocalStrategy({
		usernameField: 'rut',
		passwordField: 'contrasena'
	}, 
	function (rut, contrasena, done){
		Funcionario.verificar_funcionario(rut, (error, funcionario) => {
			if(error){
				return done(error);
			}
			funcionario.verificar_contrasena(contrasena, (error, resultado) => {
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
					rut: funcionario.rut,
					nombre: funcionario.nombre,
					correo: funcionario.correo
				});
			});
		});
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