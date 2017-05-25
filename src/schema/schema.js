/* @flow */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

const Message = Parse.Object.extend('messages');

let messagesType: GraphQLObjectType = new GraphQLObjectType({
    name: 'messages',
    description: 'Messages from parse',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Parse Id'
        },
        message: {
            type: GraphQLString,
            description: 'Message body',
            resolve: message => message.get('message')
        },
        user: {
            type: GraphQLInt,
            resolve: message => message.get('user')
        }
    })
});

let QueryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        messages: {
            type: new GraphQLList(messagesType),
            resolve: () => new Parse.Query(Message).find()
        }
    })
});

let MutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMessage: {
            type: messagesType,
            description: 'Create a new message',
            args: {
                message: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                user: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, message) => {
                return new Message(message).save().then(nm => nm);
            }
        }
    }
});

export let Schema: GraphQLSchema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
