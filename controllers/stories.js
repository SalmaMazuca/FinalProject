const StorySchema = require('../models/Story.js');
const passport = require('passport');

module.exports.controller = (app) => {
    // Obtener las historias
    app.get('/stories', function(req, res) {
        StorySchema.find({}, 'name author description release_year genre',
        (error, stories) => {
          if (error) {console.log(error); }
          res.send({
              stories,
          });
        });
    });
    // Presentación de una historia
    app.get('/api/stories/:id', (req, res) => {
        StorySchema.findById(req.params.id,
            'name author description release_year genre', (error, story) => {
            if (error) { console.error(error); }
            res.send(story);
        })
    });
    // Agregar nueva historia
    app.post('/stories', (req, res) => {
        const newStory = new StorySchema({
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            release_year: req.body.release_year,
            genre: req.body.genre
        });
        newStory.save((error, story) => {
            if (error) { console.log(error); }
            res.send(story);
        });
    });
    // Eliminar historia
    app.delete('/api/stories/:id', (req, res) => {
        StorySchema.findByIdAndDelete(req.params.id,
            {}, (error, story) => {
            if (error) { res.send('error removing'); }
            else {
                console.log(error);
                res.status(204);
            }
        })
    });
};