const colors = require('colors'); // required for console log colors
const express = require('express');

// glues express and graphql together/lets them communicate
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    theme: 'dark'   
}));

app.listen(4000, () => {
    console.log('express is listening on port 4000'.cyan);
    console.log('graphql is on port 4000/graphql'.rainbow);
});