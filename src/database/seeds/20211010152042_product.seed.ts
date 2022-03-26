import faker from '@faker-js/faker';
import { Option } from 'src/modules/option/entities/Option.entity';
import { OptionValue } from 'src/modules/option/entities/OptionValue.entity';
import { ProductOption } from 'src/modules/option/entities/ProductOption.entity';
import { Product } from 'src/modules/product/entities/Product.entity';
import { ProductImage } from 'src/modules/product/entities/ProductImage.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    for (const _ of Array.from({
      length: faker.datatype.number({ min: 6 }),
    })) {
      const data: Partial<Product> = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
      };
      const value = new Product();
      Object.assign(value, data);

      await factory(Product)().create(value);
    }

    const products = await connection.manager.find(Product);
    const options = await connection.manager.find(Option);
    const values = await connection.manager.find(OptionValue);

    //create productOption
    for (const product of products) {
      //create product Image
      for (const _ of Array.from({
        length: faker.datatype.number(5),
      })) {
        const data: Partial<ProductImage> = {
          path: faker.image.imageUrl(),
          fullpath: faker.image.imageUrl(),
          product,
        };
        const productImage = new ProductImage();
        Object.assign(productImage, data);

        await factory(ProductImage)().create(productImage);
      }

      const data: Partial<ProductOption> = {
        product,
        option: options[faker.datatype.number(options.length - 1)],
        value: values[faker.datatype.number(values.length - 1)],
        price: Number(faker.commerce.price()),
      };

      const productOption = new ProductOption();
      Object.assign(productOption, data);

      await factory(ProductOption)().create(productOption);
    }
  }
}
