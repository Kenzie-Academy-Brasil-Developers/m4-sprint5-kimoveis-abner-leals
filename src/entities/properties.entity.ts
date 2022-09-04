import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules } from "./schedules.entity";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories, (Categories) => Categories.properties, {
    eager: true,
  })
  category: Categories;

  @OneToMany(() => Schedules, (Schedules) => Schedules.property)
  schedules: Schedules[];
}
