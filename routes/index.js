var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts') 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser',async function(req,res){
   let createdUser =  await userModel.create({
    username: "Datta",
    password: "DattaP",
    email: "dattapanchal@gmail.com",
    fullname: "Dattatray Venkat Panchal",
  })
  res.send(createdUser)
})
router.get('/alluserpost',async function(req,res){
  let user = await userModel.findOne({_id:"65a7d4dcc78a588bdde4f86a"})
  .populate('posts')
  res.send(user)
})
router.get('/createpost',async function(req,res){
  let createdPost = await postModel.create({
    postText : "Hello  Everyone Kya Kar rahe ho",
    user : "65a7d4dcc78a588bdde4f86a"
  })
  let user = await userModel.findOne({_id :"65a7d4dcc78a588bdde4f86a"});
  user.posts.push(createdPost._id);
  await user.save();
  res.send('done')
})
module.exports = router;
