import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: string;

    @Column({ type: 'varchar', length: 11 })
    ruc_dni: string;

    @Column({ type: 'varchar', length: 80 })
    nombres: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    direccion: string;

    @Column({ type: 'tinyint', default: 1, comment: '0=inactivo, 1=activo' })
    estado: number;
}
