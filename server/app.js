const express = require('express')
const app = express();
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

//mongo connection
//mongoose.connect('mongodb://localhost:27017/');
mongoose.connect("mongodb://localhost:27017/admin", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectionerror'));
//app.use('/graphql' , graphHTTP({
 //schema,
 //graphiql : true
//}))
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


let port = 5000;

app.listen(port, ()=> {
    console.log("you are running on port " +port)
})