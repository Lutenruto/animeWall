const fs = require('fs');

const Anime = require('../models/Anime');

exports.createAnime = (req, res, next) => {
  const anime = new Anime({
    ...req.body
  });
  anime.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneAnime = (req, res, next) => {
  Anime.findOne({
    _id: req.params.id
  }).then(
    (anime) => {
      res.status(200).json(anime);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyAnime = (req, res, next) => {
  const anime = new Anime({
    ...req.body
  });
  Anime.updateOne({_id: req.params.id}, anime).then(
    () => {
      res.status(201).json({
        message: 'Anime updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteAnime = (req, res, next) => {
  Anime.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllAnime = (req, res, next) => {
  Anime.find().then(
    (animes) => {
      res.status(200).json(animes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};