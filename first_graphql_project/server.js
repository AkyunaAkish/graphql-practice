const express = require('express');

// glues express and graphql together/lets them communicate
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true    
}));

app.listen(4000, () => {
    console.log('express is listening on port 4000');
});