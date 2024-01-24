import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    address: string;

    @Column()
    sex: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
