import { PrimaryGeneratedColumn, Column } from "typeorm"
import { Role } from "../enum/benz.role.enum"

export class Benz {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column({unique:true})
    Email:string

    @Column()
    Password:string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role;
}
