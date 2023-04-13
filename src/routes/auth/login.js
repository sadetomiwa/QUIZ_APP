// module.exports = (req, res) => {
//     console.log(req.body);
//     res.send('Post Auth Router Login');
// }

const {axios} = require('axios');

module.exports = async (req, res) => {
    console.log(req.body);
    // First check if that passwords match
    if (req.body.password !== req.body.confirmPass){
        res.status(400).send({ error: "Your passwords do not match" })
    }
    else {
        try{
            const mutation = `
                mutation ( $email: String! $password: String!){
                    register(
                        email: $email
                        password: $password
                    )
                }
            `
            const {data} = await axios.post(process.env.GRAPHQL_ENDPOINT, 
                {
                    query: mutation,
                    variables: {
                        email: req.body.email,
                        password: req.body.password
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
            const jwtoken = data.data.register;
            res.cookie('token', jwtoken, { httpOnly: true });
            // res.cookie('token', jwtoken, { httpOnly: true, secure: true }); // for https
            res.redirect('/');
        }
        catch(e){
            console.log(err)
            res.status(400).send({ error: "Something went wrong" })
        }
    }
}

