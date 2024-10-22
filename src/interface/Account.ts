interface Account {
  accountId: number;
  name: string;
  password: string | null;
}

interface AccountNPlayer {
    accountId: number;
    playerId: number;
    name: string;
    password: string | null;
    playerName: string;
    posX: number;
    posY: number;
    maxHP: number;
    currentHP: number;
  }
  