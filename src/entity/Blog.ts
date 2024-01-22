import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "blogs" })
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    image: string;

    @Column()
    dateCreated: Date;
}
