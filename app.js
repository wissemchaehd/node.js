const express = require('express');
const app = express();
app.use(express.json());
const port = (parseInt(process.env.PORT || '3000', 10)) ;
const level = require('level');
const db = level('./db', {valueEncoding: 'json'});

app.use(express.static('public'));


// app.get('/movies/:id', (req, res) => {
//     console.log(req.params)
//     res.sendFile(__dirname + '/index.html')
// });

app.get('/movies', (req, res) => {
    res.status(200).json(movies)
});
app.post('/movies', (req, res) => {
    db.put(req.params.id, req.body)
    db.get(req.body.id,)

    console.log(req.body)
    res.status(201).json(req.body);
});

app.put('/movies/:id', (req, res) => {
    db.put(req.params.id, req.body)
    console.log(req.body)
    res.status(200).json(req.body);
});

app.delete('/movies/:id', (req, res) => {
    db.del(req.params.id)
    res.status(200).json("movie is deleted");
    console.log("movie is deleted")
});


// ajouter listes

app.post('/lists', async(req,res) => {
    await  db.put(req.body.id, req.body)

    console.log(req.body)
    res.status(201).json(req.body);
});
// affichage list
app.get('/lists/:id', async (req,res) => {
    let list =  await db.get(req.params.id)
    console.log(list)
    res.status(201).json(list);
})

app.post('/lists/:id/listmovie', async (req,res)=>{

        let list=await db.get(req.params.id)
        list.listmovie.push(req.body.film_id)
        db.put(req.params.id,list)
        console.log(list)
        res.status(200).json(list)

})



app.delete('/lists/:id', (req,res) => {
    db.del(req.params.id)
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Application à l'écoute sur le port 3000!`)
});

