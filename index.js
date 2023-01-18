var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
let h = 'hi'
let n = 'Friend'
var schema = buildSchema(`
  type Query {
    hello: Msg
  }
  type Mutation{
    addData(input:inputData): inputDataType
  }
  input inputData{
    code: Int
    name: String!
  }
  type inputDataType{
    code: Int
    name: String
  }
  type Msg{
    text: String
    name: String
  }
`);

var root = {
  hello: () => {
    return {
      text: h,
      name: n
    }
  },
  addData: ({ input }) => {
    return {
      code: input.code,
      name: input.name
    }
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));