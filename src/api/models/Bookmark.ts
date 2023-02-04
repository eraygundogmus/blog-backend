import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Bookmark {
  @PrimaryColumn("uuid")
  public id: string;

  @IsNotEmpty()
  @Column()
  public url: string;

  @IsNotEmpty()
  @Column()
  public description: string;
}
