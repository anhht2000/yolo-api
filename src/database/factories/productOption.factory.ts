import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import { define } from 'typeorm-seeding';

define(ProductOption, () => {
  const value = new ProductOption();

  return value;
});
