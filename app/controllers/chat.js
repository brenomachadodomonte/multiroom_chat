module.exports.initChat = function(application, req, res) {

    var formData = req.body;

    req.assert('nickname', 'Nickname is required').notEmpty();
    req.assert('nickname', 'Nickname must be between 4 and 16 chars').len(4, 16);

    var errors = req.validationErrors();
    if(errors){
        res.render('index', {validation: errors});
        return;
    }

    application.get('io').emit('msgToClient', {nickname: formData.nickname, 'message': ' just signed in!'});
    res.render('chat', {formData: formData});
}
