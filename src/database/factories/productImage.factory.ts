import { ProductImage } from 'src/modules/product/entities/ProductImage.entity';
import { define } from 'typeorm-seeding';

define(ProductImage, () => {
  const value = new ProductImage();

  return value;
});
