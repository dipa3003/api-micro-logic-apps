import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Partai } from "./Partai";

@Entity({ name: "paslons" })
export class Paslon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    paslonNumber: number;

    @Column()
    visionMission: string;

    @Column()
    image: string;

    @OneToMany(() => Partai, (partai) => partai.paslon)
    partais: Partai[];
}
