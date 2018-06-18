module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'ec2-23-21-238-28.compute-1.amazonaws.com',
      user: 'btkuofbymlttmh',
      password: '1223ec1ebb0f9ad8b66751414b2241b2c51af89e32ccde82a9fd5eb9241f2334',
      database: 'ddrfds30621mgf',
      ssl: true,
    },
    migrations: {
      directory: './migrations',
    },
    useNullAsDefault: true,
  },
};
