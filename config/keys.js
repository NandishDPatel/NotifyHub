// module.exports = {
//     googleClientID : '41256036201-phk5ro4pclj0pqo78nccmol7lnqbhnl6.apps.googleusercontent.com',
//     googleClientSecret : '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',
// }

if(process.env.NODE_ENV === 'production'){
    //we are in production - return production set of keys
    module.exports = require('./prod');
} else{
    module.expors = require('./dev');
}

// mongoURI: 'mongodb+srv://nandishdpatel22:LY3QZEK0jL9TU0Cw@cluster0.l5jtp.mongodb.net/NotifyHubProd?retryWrites=true&w=majority&appName=Cluster0'