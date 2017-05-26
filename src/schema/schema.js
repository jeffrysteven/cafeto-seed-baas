/* @flow */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const Message = Parse.Object.extend('messages');
const User = Parse.User;
const Post = Parse.Object.extend('Post');

let usersType: GraphQLObjectType = new GraphQLObjectType({
    name: 'users',
    description: 'Users from parse',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'User id'
        },
        emailVerified: {
            type: GraphQLBoolean,
            description: 'User is verified',
            resolve: user => user.get('emailVerified')
        },
        username: {
            type: GraphQLString,
            description: 'User username',
            resolve: user => user.get('username')
        },
        email: {
            type: GraphQLString,
            description: 'User email',
            resolve: user => user.get('email')
        }
    })
});

let postsType: GraphQLObjectType = new GraphQLObjectType({
    name: 'posts',
    description: 'Posts from parse',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Post Id'
        },
        title: {
            type: GraphQLString,
            description: 'Post title',
            resolve: post => post.get('title')
        },
        content: {
            type: GraphQLString,
            description: 'Post content',
            resolve: post => post.get('content')
        },
        author: {
            type: usersType,
            description: 'Post author',
            resolve: post => post.get('author')
        }
    })
});

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
        },
        users: {
            type: new GraphQLList(usersType),
            resolve: () => new Parse.Query(User).find()
        },
        posts: {
            type: new GraphQLList(postsType),
            resolve: () => new Parse.Query(Post).find()
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
