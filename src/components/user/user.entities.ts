import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserGender {
  male = "male",
  female = "female",
  transgender = "transgender"
}

export  enum UserRoles {
  admin = "admin",
  buyer = "buyer",
  sales = "seller"
}
export  enum UserStatuses{
  active = "active",
  inactive = "inactive"
}


@Entity("users")
export class User {
  @PrimaryGeneratedColumn({name: "id", type: 'int'})
  id!: number;

  @Column({name: "user_name", type: "varchar"})
  username!: string;

  @Column({name: "first_name", type: "varchar"})
  firstName!: string;

  @Column({name: "last_name", type: "varchar"})
  lastName!: string;

  @Column({name: "email", type: "varchar"})
  email!: string;

  @Column({name: "role", type: "varchar"})
  role!: string;

  @Column({name: "birthday", type: "varchar"})
  birthday!: string;

  @Column({name: "gender", type: "varchar"})
  gender!: string;

  // @Column({name: "avatar", type: 'bytea'})
  // avatar!: string;

  @Column({name: "token", type: "varchar"})
  token!: string;

  @Column({name: "password", type: "varchar"})
  password!: string;

  @Column({name: "old_password", type: "varchar", default: null})
  oldPassword!: string;

  @Column({name: "super_admin", type: "boolean", default: false})
  superAdmin!: boolean;

  @Column({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt!: Date;
}