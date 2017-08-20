var express = require('express');
var jsonfile = require('jsonfile');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});



var file_1 = './db_json/lists.json';
var file_2 = './db_json/cards.json';
var file_4 = './db_json/comments.json';
var file_3 = './db_json/tasks.json';



var listData = jsonfile.readFileSync(file_1);
var cardData = jsonfile.readFileSync(file_2);
var commentData = jsonfile.readFileSync(file_4);
var taskData = jsonfile.readFileSync(file_3);

// # Lists
app.get('/listData', function (req, res) {
    res.json(listData);
    res.end();
});
app.post('/addList',function(req,res){
    listData.lists.push(req.body);
    jsonfile.writeFileSync(file_1, listData);

    res.json(listData);    //jsonfile.writeFileSync(file, data);
})


// # Cards
app.get('/cardData', function (req, res) {
    res.json(cardData);
    res.end();
});
app.post('/addCard',function(req,res){
	cardData.cards.push(req.body);
    console.log(cardData.cards)
    jsonfile.writeFileSync(file_2, cardData);

    res.json(cardData);
});
app.put('/updateCard/:id',function(req,res){
	var requestId = req.params.id;
	let card = cardData.cards.filter(card => {
		return card.id == requestId
	})[0]
	let index = cardData.cards.indexOf(card)
	cardData.cards.splice(index,1)
	cardData.cards.splice(index,0,req.body);
    jsonfile.writeFileSync(file_2, cardData);

	res.json(cardData);
})

app.post('/updateDragCard',function(req,res){
    let card = cardData.cards.filter(card => {
        return card.id == req.body.id
    })[0]
    obj= {
        id: card.id,
        list_id: req.body.list_id,
        title: card.title,
        tasks:[]
    }
    console.log(req.body.source_index,req.body.target_index)
    cardData.cards.splice(req.body.source_index,1)
    cardData.cards.splice(req.body.target_index,0, obj)
    jsonfile.writeFileSync(file_2, cardData);
     res.json(cardData);
})

app.delete('/deleteCard/:id',function(req,res){
	var requestId = req.params.id;
	let card = cardData.cards.filter(card => {
		return card.id == requestId
	})[0]
	let index = cardData.cards.indexOf(card)
	cardData.cards.splice(index,1)
    jsonfile.writeFileSync(file_2, cardData);

	res.json(cardData);
})

// # Tasks
app.get('/taskData', function (req, res) {
    res.json(taskData);
    res.end();
});
app.post('/addTask',function(req,res){
    taskData.tasks.push(req.body);
    jsonfile.writeFileSync(file_3, taskData);

    res.json(taskData);
    //jsonfile.writeFileSync(file, data);
});
app.put('/updateTask/:id',function(req,res){
    var requestId = req.params.id;
    let task = taskData.tasks.filter(task => {
        return task.id == requestId
    })[0]
    let index = taskData.tasks.indexOf(task)
    taskData.tasks.splice(index,1)
    taskData.tasks.splice(index,0,req.body);
    jsonfile.writeFileSync(file_3, taskData);

    res.json(taskData);
})

app.post('/updateDragTask',function(req,res){
    let task = taskData.tasks.filter(task => {
        return task.id == req.body.id
    })[0]
    obj= {
        id: task.id,
        card_id: req.body.card_id,
        title: task.title,
        comments:[]
    }
    taskData.tasks.splice(req.body.source_index,1)
    taskData.tasks.splice(req.body.target_index,0, obj)
    jsonfile.writeFileSync(file_3, taskData);
    res.json(taskData);
})

app.delete('/deleteTask/:id',function(req,res){
	var requestId = req.params.id;
    let task = taskData.tasks.filter(task => {
        return task.id == requestId
    })[0]
    let index = taskData.tasks.indexOf(task)
    taskData.tasks.splice(index,1)
    jsonfile.writeFileSync(file_3, taskData);
    res.json(taskData);
})
// # comments
app.get('/commentData', function (req, res) {
    res.json(commentData);
    res.end();
});
app.post('/addComment',function(req,res){
    commentData.comments.push(req.body);
    jsonfile.writeFileSync(file_4, commentData);
    res.json(commentData);    //jsonfile.writeFileSync(file, data);
})
app.put('/updateComment/:id',function(req,res){
    var requestId = req.params.id;
    let comment = commentData.comments.filter(comment => {
        return comment.id == requestId
    })[0]
    let index = commentData.comments.indexOf(comment)
    commentData.comments.splice(index,1)
    commentData.comments.splice(index,0,req.body);
    jsonfile.writeFileSync(file_4, commentData);

    res.json(commentData);
})
app.delete('/deleteComment/:id',function(req,res){
	 var requestId = req.params.id;
    let comment = commentData.comments.filter(comment => {
        return comment.id == requestId
    })[0]
    let index = commentData.comments.indexOf(comment)
    commentData.comments.splice(index,1)
    jsonfile.writeFileSync(file_4, commentData);

    res.json(commentData);
})

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});