import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { Product } from '../../product/entities';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
