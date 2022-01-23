const Joi = require('joi');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
	client_id: 'ef4047eddc0cd5642302',
	redirect_uri: 'http://localhost:3000/login',
	client_secret: '49e31b94a1cae37bc4ef97b3697b7dbe0068bc8a',
	proxy_url: 'http://localhost:5000/authenticate',
};

const envVarsSchema = Joi.object({
	client_id: Joi.string().required(),
	redirect_uri: Joi.string().required(),
	client_secret: Joi.string().required(),
	proxy_url: Joi.string().required(),
});

const { error } = envVarsSchema.validate(config);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = config;
