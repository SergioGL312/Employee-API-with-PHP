const myModal = new bootstrap.Modal(document.getElementById('modalId'), {Keyboard: false});

const aplication = new function() {
    this.nombre = document.getElementById('nombre');
    this.email = document.getElementById('email');
    this.idEditar = document.getElementById('idEditar');
    this.nombreEditar = document.getElementById('nombreEditar');
    this.emailEditar = document.getElementById('emailEditar');
    this.empleados = document.getElementById('empleados');
    this.form = document.getElementById('form');

    this.leer = function(){
        let datos = "";
        fetch("http://localhost/empleados/")
        .then(res => res.json())
        .then(res => {
            res.map(function (empleado) {
                datos += `<tr>`;
                datos += `<td>${empleado.id}</td>`;
                datos += `<td>${empleado.nombre}</td>`;
                datos += `<td>${empleado.correo}</td>`;
                datos += `<td>`
                datos += `<div class="btn-group" role="group" aria-label="Button group name"><button type="button" class="btn btn-info" onclick="aplication.editar(${empleado.id});">Editar</button> <button type="button" class="btn btn-danger" onclick="aplication.borrar(${empleado.id});">Borrar</button></div>`;
                datos += `</td>`;
                datos += `</tr>`;
                //datos += `<tr><td>${empleado.id}</td><td>${empleado.nombre}</td><td>${empleado.correo}</td><td>${empleado.id}</td></tr>`;
            });
            return this.empleados.innerHTML = datos;
        })
        .catch(err => console.log(err));
    };

    this.agregar = function (){
        fetch("http://localhost/empleados/?insertar=1", { method: "POST",
            body: JSON.stringify({
                nombre: `${this.nombre.value}`,
                correo: `${this.email.value}`,
            })
        })
        .then(resolve => resolve.json())
        .then(resolve => {
            alert("Empleado Agregado Correctamente");
            this.form.reset();
            this.leer();
        })
        .catch(err => console.error(err));
    };

    this.borrar = function(id) {
        let confirmacion = confirm(`Seguro que quieres borrar al Id: ${id}`);
        if (confirmacion) {
            fetch(`http://localhost/empleados/?borrar=${id}`)
                .then(resolve => resolve.json())
                .then(resolve => {
                    this.leer();
                    alert("Empleado Borrado Exitosamente");
                })
                .catch(err => console.error(err));
        }
    }

    this.editar = function (id) {
        fetch(`http://localhost/empleados/?consultar=${id}`)
                .then(resolve => resolve.json())
                .then(resolve => {
                    this.idEditar.value = resolve[0].id;//['id']
                    this.nombreEditar.value = resolve[0].nombre;//['nombre']
                    this.emailEditar.value = resolve[0].correo;//['correo']
                })
                .catch(err => console.error(err));
        myModal.show();
    }

    this.actualizar = function () {
        let id = this.idEditar.value;
        let nombre =  this.nombreEditar.value;
        let email = this.emailEditar.value;
        
        fetch("http://localhost/empleados/?actualizar=1", { method: "POST", 
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                correo: email,
            })
        })
        .then(resolve => resolve.json())
        .then(resolve => {
            alert("Datos Actualizados Correctamente");
            this.leer();
            myModal.hide();
        })
        .catch(err => console.error(err));
    }
    
}

aplication.leer();
