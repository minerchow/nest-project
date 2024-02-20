import { Column, PrimaryGeneratedColumn , Entity } from "typeorm";

@Entity()
export class NV_Users {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string
}
