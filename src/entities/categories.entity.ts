import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";
@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Properties, (categories) => categories.category)
  properties: Properties[];
}
