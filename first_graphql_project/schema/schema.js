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

// comes before user since a user has a 
// relation to a company
// which needs to be established first
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

// tells graphql about a user type
// in our app and what properties it 
// has
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { // turns into companyId 
            type: CompanyType,
            resolve(parentValue, args) {
                // tells graphql how to get
                // related company data
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                            .then((r) => r.data);
            }
        }
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

// {
//     user(id: "40") {
//         id,
//             firstName,
//             age,
//             company {
//                 id,
//                 name,
//                 description
//         }
//     }
// }