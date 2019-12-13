import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class CosmeticStore {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    price: number;

}
