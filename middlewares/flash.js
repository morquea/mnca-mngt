module.exports = function(request, response, next) {

    // executé a chaque requete
    //si message flash, je le recopie dans la réponse qui l'affichera
    if (request.session.flash) {
        //console.log('flash : ' + JSON.stringify(request.session.flash))
        response.locals.flash = request.session.flash;
    }
    // je n'ai plus besoin du message flash
    request.session.flash = undefined;

    // fonction appelée si pas de request.body.message
    request.flash = function(type, content) {

        // j'initialise le message flas a objet vide
        if (request.session.flash === undefined) {

            request.session.flash = {};
        }

        // je remplis le message
        request.session.flash[type] = content;

    };

    next();
};