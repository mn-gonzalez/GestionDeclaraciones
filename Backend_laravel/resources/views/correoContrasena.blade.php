<div style = " height: 800px; display: flex; justify-content: center; align-items: center;">
    <div style="height: 100%; width: 500px; display: flex; flex-direction: column; justify-content:center; 
            row-gap: 20px; border: 1px solid black; border-radius: 10px; background-color: #a41e2e;">

        <div style="display:flex; flex-direction:column; justify-content: space-between; background-color: white; height: 80%">
            <div style="width: 80%; display: flex; flex-direction: row; align-items: center; align-self: center;">
                <img style="height: 100px;" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Utalca.svg">
                <p style="font-size: 18px;"><b>Departamento de Apoyo Financiero al Estudiante</b></p>
            </div>
            
            <div style="width: 80%; align-self: center;">
                <p style="font-size: 18px"><b>Estimado/a <br> {{$deudor}}:</b></p>
                <p style="font-size: 18px">{{$mensaje}}</p>
                <p><a style="font-size: 18px" href="{{$enlace}}">Recuperar Contraseña</a></p>
            </div>

            <div></div>
            <div></div>
            
            <div style="align-self: center;">
                <p>Este es un mensaje generado automáticamente.</p>
            </div>
        </div>
    </div>
</div>