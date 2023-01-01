const config ={
    db:{
        credentials:{
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    },
    aws:{
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, //credentials for your IAM user
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, //credentials for your IAM user
            region: process.env.AWS_DEFAULT_REGION
        }
    }
};
module.exports = config;