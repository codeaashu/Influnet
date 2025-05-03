export interface UserAttributes {
  id?: string; // optional because Sequelize will generate it
  fullname: string;
  email: string;
  password_hash: string;
  profile_image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Omit<
    UserAttributes,
    "id" | "profile_image" | "createdAt" | "updatedAt"
  > {}
