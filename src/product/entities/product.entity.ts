import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common';
import { Category } from '../../category/entities';

@Entity('products')
export class Product extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  @Index()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'NO ACTION',
    nullable: false,
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category!: Category;
}
