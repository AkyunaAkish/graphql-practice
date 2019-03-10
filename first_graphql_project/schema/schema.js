// this file is used to inform GraphQL
// about what data we have in our
// application so that is may do the
// proper queries when invoked
const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'Samantha', age: 21 },
];

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
                // parentValue is rarely used
                // args are more important,
                // it contains the arguments
                // originally passed to our query
                
                // this resolve function requires we 
                // return json data and then
                // the other logistics of typing
                // and filtering fields is handled
                // behind the scenes by graphql
                return _.find(users, { id: args.id });
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