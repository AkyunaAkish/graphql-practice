# Notes

### Why GraphQL

```
GraphQL aims to solve the problems with REST.

For example, for simple API requests, REST is clean and easy.

But for complex requests, URLs can get complex/messy and require many different endpoints to tend to the many needs of the REST API clients.

With GraphQL, you no longer need to make many different API routes to tend to every situation/combination of data that's needed. 

Instead, the clients of the GraphQL server can simply make queries for exactly the data they need, no more no less, and receive that data by GraphQL joining all the right data points together and only retrieving the specific data points asked for.

This makes it easier on the server side coding to not have to always be developing complex routes to join data together. And it helps the client side code be able to be in charge of asking for exactly the data it needs and not receive extra data and the client side won't have to worry that the server side code might not be querying the data in the most efficient way. 
```

### GraphQL Schema

```
The graphql schema is the mapping given to graphql to tell it what data there is in the DB and how the data relates to each other. 

The schema is crucial for GraphQL to be able to query the data in our datastores properly.
```