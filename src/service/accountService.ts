import connection from '../utils/database';

const accountService = {
  getAccountByAccountName: async (name: string) => {
    return await connection.getQuery(`
        SELECT
          id
        FROM
          account
        WHERE
          name = '${name}' 
    `);
  },

  getAccountByAccountNameNPassword: async (name: string, password:string) => {
    return await connection.getQuery(`
        SELECT
          id,
          IF(password = '${password}', TRUE, FALSE) as password
        FROM
          account
        WHERE
          name = '${name}' 
    `);
  },
};

export default accountService;
