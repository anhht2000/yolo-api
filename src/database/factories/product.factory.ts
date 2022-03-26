import { Product } from 'src/modules/product/entities/Product.entity';
import { define } from 'typeorm-seeding';

define(Product, () => {
  const value = new Product();

  return value;
});
