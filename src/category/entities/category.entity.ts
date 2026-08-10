import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description?: string;
}
