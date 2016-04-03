/**
 * Created by Daniel on 2/04/2016.
 */
var url = 'http://udem.herokuapp.com/parcial';

var messagesModel = Backbone.Model.extend({
    defaults: {
        message: '',
        picture: '',
        icon: ''
    }
});

var messagesollection = Backbone.Collection.extend({
    model: messagesModel,
    url: url,
    parse: function(response) {
        return response.messages;
    }
});

var messagesCollectionView = Backbone.View.extend({
    el: '#mydiv',
    template: _.template($("#details").html()),
    initialize: function() {
        var self = this;

        self.collection = new messagesollection();

        self.collection.fetch()
            .always(function() {
                self.render(self.collection.toJSON());
            });

    },
    render: function(data) {
        this.$el.html(this.template({
            messages: data
        }));
        return this;
    }
});

var view = new messagesCollectionView();