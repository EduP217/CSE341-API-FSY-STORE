const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema");

router.use("/", ensureAuth, graphqlHTTP({
    graphiql: true,
    schema
}));


module.exports = router;