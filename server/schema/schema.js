const graphql = require('graphql');
const _ = require('lodash');
const User = require('../model/user')
const { GraphQLObjectType, GraphQLString , GraphQLSchema , GraphQLID} = graphql;

//this is type. how our database look like
const UserType = new GraphQLObjectType({
    name :'User',
    fields:() =>({
        id :  { type : GraphQLID},
        name : { type : GraphQLString},
        email : { type : GraphQLString },
        password : { type : GraphQLString }
    }) 
});

//what we want from database
const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type : UserType,
            args : {email: { type: GraphQLString} , password : { type : GraphQLString } },
            resolve: async (parent ,{ email, password }) =>{
            const data = await User.findOne({ email , password } ,)
            return data
            }
        },

    }
});
//mutation is for create data
const Mutation  = new GraphQLObjectType({
    name  : 'Mutation',
    fields : {
        registration: { 
            type : UserType,
            args :{
                name : { type : GraphQLString },
                email : { type : GraphQLString },
                password :{ type : GraphQLString}
            },
            resolve (parent , args){
                let user = new User({
                    name : args.name,
                    email : args.email,
                    password : args.password
                })
               return user.save()
            }
        }
    }
})

//we need to export query and mutation schema
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})