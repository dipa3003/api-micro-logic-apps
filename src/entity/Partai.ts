import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paslon } from "./Paslon";

@Entity({ name: "partais" })
export class Partai {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    partaiNumber: number;

    @Column()
    image: string;

    @Column()
    visionMission: string;

    @Column()
    address: string;

    @ManyToOne(() => Paslon, (paslon) => paslon.partais)
    paslon: Paslon;
}
