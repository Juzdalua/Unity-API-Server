import connection from '../utils/database';

class PlayerService {
  async UpdateMove(playerId: number, posX: number, posY: number): Promise<Boolean> {
    try {
      await connection.getQuery(`
        update player 
        set 
          posX = ${posX},
          posY = ${posY}
          where id =${playerId};
      `);
      return true;
    } catch (error) {
      return false;
    }
  }

  async IsJoinparty(playerId: number): Promise<Boolean> {
    const isJoinParty = await connection.getQuery(`
        select id 
        from partyplayer
        where status = "0"
        and playerId = ${playerId};
      `);
    if (isJoinParty.length > 0) return true;
    return false;
  }

  async CreateParty(playerId: number): Promise<number> {
    try {
      await connection.beginTransaction();

      await connection.getQuery(`
        insert into party() values ();
      `);

      const [rows] = await connection.getQuery(`SELECT LAST_INSERT_ID() as id;`);
      const insertedId = rows.id;

      await connection.getQuery(`
        insert into partyplayer (partyId, playerId) values(${insertedId}, ${playerId});
      `);

      const [row] = await connection.getQuery(`SELECT LAST_INSERT_ID() as id;`);
      const partyId = row.id;

      await connection.commit();
      return partyId;
    } catch (error) {
      await connection.rollback();
      console.log(error);
      return -1;
    }
  }
}

export default new PlayerService();
