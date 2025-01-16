require('@dotenvx/dotenvx').config()

console.log(process.env.PORT);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.SECRET_KEY);