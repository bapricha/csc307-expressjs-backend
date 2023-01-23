const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}


// filter by name
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

// id GET endpoint 
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


/* POST */
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

/* DELETE */
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']
    const userToDelete = findUserById(id)
    if (userToDelete === undefined) {
        res.status(200).end();
    }
    else {
        deleteUser(userToDelete);
        res.status(204).end();
    }
});

function deleteUser(userToDelete){
    const index = users['users_list'].indexOf(userToDelete)
    if(index < 0 || index > users['users_list'].length)
        res.status(200).end();
    else
        users['users_list'].splice(index, 1);
}

/* STEP 7 
app.get('/users', (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    const list = getUsers(name, job);
    if (list.length === 0)
        res.status(404).send('Resource not found.');
    else {
        res.send(list);
    }
});

function getUsers(name, job) {
    const list = [];
    users['users_list'].forEach( (user) => {
        if(user['name'] === name && user['job'] === job) {
            list.push(user);
        }
    })
    return list
}*/
