var https = require('https');
const EWS = require('node-ews');

const ewsFunction = 'FindItem';

var ewsArgs = {
  'attributes': {
    'Traversal': 'Shallow'
  },
  'ItemShape': {
    'BaseShape': 'IdOnly'
  },
  'ParentFolderIds' : {
    'DistinguishedFolderId': {
      'attributes': {
        'Id': 'inbox'
      }
    }
  }
};

async function authenticate(username,password,res) {
	let login = false;
	const ewsConfig = {
	  username: username,
	  password: password,
	  host: 'https://outlook.office365.com',
	  auth: 'basic'
	};
	const ews = new EWS(ewsConfig);
    try {
        let result = await ews.run(ewsFunction, ewsArgs);
        login = true;
        console.log("Login: "+login);
        res.status(200).redirect("/png01")
        }
    catch (err) {
		login = false;
    console.log("Login: "+login);
    res.redirect("/");
    }
    return login
};

module.exports.authenticate = authenticate;