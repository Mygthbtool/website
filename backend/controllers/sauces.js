const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    imageUrl: url + '/images/' + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    userId: req.body.sauce.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save().then(
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

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      userId: req.body.sauce.userId
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      mainPepper: req.body.mainPepper,
      userId: req.body.userId
    };
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
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

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id})
        .then(() => {
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
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeAndDislikeSauce = (req, res, next) => {
  
    let userIdentifier = req.body.userId;
    let likeStatus = req.body.like;

    // If the user like the sauce, likestatus increased by 1      
        if(likeStatus === 1) {
            
            Sauce.updateOne({_id: req.params.id}, {$inc:{likes: +1},
                            $push:{usersLiked: userIdentifier}})
            .then(() =>   
                res.status(201).json({
                message: 'like has been added successfully!'         
                })
                
            )
            .catch((error) => {
                res.status(400).json({
                error: error});
            }) 
                                      
        }
            
    // If the user dislike the sauce, likestatus decreased by 1  
        else if (likeStatus === -1) {
        
            Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes: +1},
                            $push:{usersDisliked: userIdentifier}})
            .then(() =>   
                res.status(201).json({
                message: 'dislike has been added successfully!'  
                    
                })
            )
            .catch((error) => {
                res.status(400).json({
                error: error});
            })
               
        }    
    // If the user cancel his like or dislike
    else if (likeStatus === 0) {       
        // user cancel his like
        Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
                if(sauce.usersLiked.includes(userIdentifier)){
                    Sauce.updateOne({_id: req.params.id}, {$inc:{likes:-1},
                     $pull:{usersLiked:userIdentifier}})
        
                    .then(() => res.status(201).json({message: "Like has been canceled"}))
                    .catch(error => res.status(400).json(error))
                    
                }               
                //user cancel his dislike
                if(sauce.usersDisliked.includes(userIdentifier)){

                    Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:-1},
                    $pull:{usersDisliked:userIdentifier}})

                    .then(() => res.status(201).json({message: "Dislike has been canceled"}))
                    .catch(error => res.status(400).json(error))
                } 
            
        })
    } 
}




