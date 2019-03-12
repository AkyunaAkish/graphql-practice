// this file is used to inform GraphQL
// about what data we have in our
// application so that is may do the
// proper queries when invoked
const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// tells graphql about a user type
// in our app and what properties it 
// has
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

// entry point into our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { 
                id: {
                    type: GraphQLString
                }   
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                            .then((r) => r.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


// GraphiQL query examples:
// {
//     user(id: "23") {
//         id,
//             firstName,
//             age
//     }
// }