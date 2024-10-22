import connection from '../utils/database';

class AccountService {
  async getAccountByAccountId(id: number): Promise<Account | null> {
    const result = await connection.getQuery(`
          SELECT
              id as accountId,
              name
          FROM
              account
          WHERE
              id = ${id}
        `);

    return result.length > 0 ? result[0] : null;
  }

  async getAccountByAccountName(name: string): Promise<Account | null> {
    const result = await connection.getQuery(`
      SELECT
          id as accountId,
          name
      FROM
          account
      WHERE
          name = '${name}' 
    `);

    return result.length > 0 ? result[0] : null;
  }

  async getAccountByPlayerId(playerId: number): Promise<Account | null> {
    const result = await connection.getQuery(`
      SELECT 
          account.id as accountId,
          account.name 
      FROM
          account
      LEFT JOIN 
          player 
      ON 
          player.account_id = account.id
      WHERE 
          player.id = ${playerId}
    `);
    return result.length > 0 ? result[0] : null;
  }

  async getAccountNPlayerByAccountId(accountId: number): Promise<AccountNPlayer | null> {
    const result = await connection.getQuery(`
      SELECT
          account.id as accountId,
          account.name,
          -- account.password as password,
          NULL as password,
          player.id as playerId,
          player.name as playerName,
          player.posX,
          player.posY,
          player.maxHP,
          player.currentHP 
      FROM 
          account
      LEFT JOIN
          player 
      ON
          account.id = player.account_id
      WHERE 
          account.id = ${accountId};    
    `);
    return result.length > 0 ? result[0] : null;
  }

  async getAccountNPlayerByName(name: string): Promise<AccountNPlayer | null> {
    const result = await connection.getQuery(`
      SELECT
          account.id as accountId,
          account.name,
          account.password as password,
          player.id as playerId,
          player.name as playerName,
          player.posX,
          player.posY,
          player.maxHP,
          player.currentHP 
      FROM 
          account
      LEFT JOIN
          player 
      ON
          account.id = player.account_id
      WHERE 
          account.name = '${name}';    
    `);
    return result.length > 0 ? result[0] : null;
  }

  async createAccount(name: string, password: string): Promise<Boolean> {
    try {
      await connection.beginTransaction();

      await connection.getQuery(`
        INSERT INTO account (name, password) VALUES ('${name}', '${password}');
      `);

      const [rows] = await connection.getQuery(`SELECT LAST_INSERT_ID() as id;`);
      const insertedId = rows.id;
      await connection.getQuery(`
        INSERT INTO player (account_id, name) VALUES (${insertedId}, '${name}');
      `);

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      console.log(error);
      return false;
    }
  }

  async getAccountByAccountNameNPassword(name: string, password: string): Promise<number> {
    const result = await connection.getQuery(`
      SELECT
          id as accountId,
          IF(password = '${password}', TRUE, FALSE) as password
      FROM
          account
      WHERE
          name = '${name}' 
    `);

    if (result.length == 0) return -1;
    if (result.length > 0 && result[0].password == 1) return result[0].accountId;
    return -2;
  }
}

export default new AccountService();
