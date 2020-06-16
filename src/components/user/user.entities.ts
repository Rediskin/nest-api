import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity("user_master_data")
export class UserMasterData{

  @PrimaryGeneratedColumn({name: "id", type: 'int'})
  id!: number;

  @Column({name: "location", type: "varchar"})
  location!: string;

  @Column({name: "city", type: "varchar"})
  city!: string;

  @Column({name: "post_code", type: "int"})
  postCode!: string;

  @Column({name: "street", type: "varchar"})
  street!: string;

  @Column({name: "house_number", type: "varchar"})
  houseNumber!: string;

  @Column({name: "apartments", type: "int"})
  apartments!: string;

  @Column({name: "card_number", type: "int"})
  cardNumber!: string;

  @Column({name: "card_month", type: "int"})
  cardMonth!: string;

  @Column({name: "card_year", type: "int"})
  cardYear!: string;

  @Column({name: "delivery_office_number", type: "int"})
  deliveryOfficeNumber!: string;

  @Column({name: "delivery_office_address", type: "varchar"})
  deliveryOfficeAddress!: string;

  @Column({name: "delivery_office_city", type: "varchar"})
  deliveryOfficeCity!: string;

  @Column({name: "phone_number", type: "varchar"})
  phoneNumber!: string;

  @Column({name: "fax_number", type: "varchar"})
  faxNumber!: string;

  // @OneToOne(() => User, /*(user) => user.userMasterData*/)
  // user!: User;
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

  @Column({name: "master_data_id", type: "int", default: null})
  masterDataId!: number;

  @Column({name: "super_admin", type: "boolean", default: false})
  superAdmin!: boolean;

  @Column({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt!: Date;

  @OneToOne(() => UserMasterData)
  @JoinColumn({name: "master_data_id"})
  userMasterData!: UserMasterData;

}