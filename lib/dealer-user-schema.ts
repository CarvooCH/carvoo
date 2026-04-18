export type DealerUserRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  passwordHash: string;
  active: boolean;
  notes: string;
};

export type DealerUserSafe = Omit<DealerUserRecord, "passwordHash">;
