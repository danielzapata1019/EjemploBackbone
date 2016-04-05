/**
 * Created by Daniel on 2/04/2016.
 */
var url = 'http://udem.herokuapp.com/parcial';

var messagesModel = Backbone.Model.extend({  /*Metodo extend del backbone.model... Aca creamos el modelo*/
    defaults: {  /*Permite agregar atributos por defecto cada vez que instanciamos el modelo*/
        message: '',
        picture: '',
        icon: ''
    }
});

var messagesollection = Backbone.Collection.extend({
    model: messagesModel,
    url: url,
    parse: function(response) {/* función parse de la coleccion, la respuesta solamente me retorne los mensajes*/
        return response.messages;
    }
});
/*Vista: Contiene la logica de como se deben presentar los datos al usuario mas no el html que se le mostrara
al usuarioc(se usan los templates de underscore*/

var messagesCollectionView = Backbone.View.extend({ /*Se crea la Vista de la coleccion extendiendo de Backbone.view*/
    el: '#mydiv',  /* el: principal propiedad de una vista, Hace referencia al elemento de el DOM donde se mostrara
     la vista.*/
    template: _.template($("#details").html()),
    initialize: function() {  /*Initialize: funcion predefinida*/
        var self = this;/* Variable que me contiene o hace referencia al objeto donde se llama la vista*/

        self.collection = new messagesollection(); /*Hago la instancia de la colección, a la vista le agregamos
        la coleccion de los mensajes */

        self.collection.fetch()/*El método fetch() realiza una operación de lectura (‘read’) y sirve para refrescar
                                            los datos del modelo a partir de la copia existente en el servidor:*/
            .always(function() {  /* Siempre se ejecuta cuando el ya termina de realizar la peticion, sea exitosa o no*/
                self.render(self.collection.toJSON());  /*toJson nos devuelve el contenido del modelo*/
            });

    },
    render: function(data) { /*Render: Principal método de una vista, ayuda a renderizar la vista de nuestra página..
     se llamará cada vez que se necesite redibujar la vista.
     Render--> Pintar, toma la informacion de la coleccion y me devuelva esa informacion  en el html
     */
        this.$el.html(this.template({ /*$el propiedad que le seteamos arriba, entonces a la vista le pasamos el
                                            template y los daros en formato json*/
            messages: data
        }));
        return this;
    }
});

var view = new messagesCollectionView(); /*Instanciamos la vista*/

