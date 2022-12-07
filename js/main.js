const app = Vue.createApp({
    data(){
        return{
            result: null,
            meses:null,
            anios:null,
            mes: null,
            anio:null,
            fecha: null,
            total:0
        }
    },
    computed:{
        fechamin(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            return today = yyyy+'-'+mm+'-'+dd;
        }
    },
    methods: {
        traerAnios(){
            let self = this;
            $.ajax({
                url: "https://run.mocky.io/v3/b5275613-53cc-4b8d-81d5-795cede38ed7",
                method: 'GET',
            }).done(function (data){
                self.anios = data;
            }).fail (function (){
                self.error = "No se encontraron datos"
            })
        },
        traerMeses(){
            let self = this;
            $.ajax({
                url: "https://run.mocky.io/v3/03ff0e96-794f-4229-bbc9-b44a3771450b",
                method: 'GET',
            }).done(function (data){
                self.meses = data;
            }).fail (function (){
                self.error = "No se encontraron datos"
            })
        },
        traerDatos(){
            let self = this;
            $.ajax({
                url: "https://run.mocky.io/v3/b6c25d5b-0298-47db-a045-308d1538c109",
                method: 'GET',
            }).done(function (data){
                self.result = data;
            }).fail (function (){
                self.error = "No se encontraron datos"
            })
        },
        calcular(){ 
            if (!this.anio){
                Swal.fire({
                    title: 'Error!',
                    text: 'Debe seleccionar un año',
                    icon: 'error'
                  })
                return;
            }
            if (!this.mes){
                Swal.fire({
                    title: 'Error!',
                    text: 'Debe seleccionar un mes',
                    icon: 'error'
                  })
                return;
            }
            if (!this.fecha){
                Swal.fire({
                    title: 'Error!',
                    text: 'Debe seleccionar una fecha',
                    icon: 'error'
                  })
                return;
            }
            this.total = 0;
            let mesSeleccionado = this.mes;
            switch (this.anio) {
                case "primero":
                    this.total = this.result.primero[mesSeleccionado];
                    this.calcularAumento();
                    break;
                case "segundo":
                    this.total = this.result.segundo[mesSeleccionado]
                    this.calcularAumento();
                    break;
                case "tercero":
                    this.total = this.result.tercero[mesSeleccionado]
                    this.calcularAumento();
                    break;
                case "cuarto":
                    this.total = this.result.cuarto[mesSeleccionado]
                    this.calcularAumento();
                    break;            
                default:
                    break;
            }
        },
        calcularAumento(){
            var selectedFecha = moment(this.fecha).format('DD');
            if (selectedFecha > 15){
                this.total = this.total+400;
            }
        }
    },
    mounted() {
        
        this.traerDatos();
        this.traerAnios();
        this.traerMeses();
    }
})