// @flow

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

let QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        // Add fields here
    })
});

export let Schema = new GraphQLSchema({
    query: QueryType
});