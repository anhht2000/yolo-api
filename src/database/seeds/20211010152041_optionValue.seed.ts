import faker from '@faker-js/faker';
import { Option } from 'src/modules/option/entities/Option.entity';
import { OptionValue } from 'src/modules/option/entities/OptionValue.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateOptionValues implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const options = await connection.manager.find(Option);

    for (const option of options) {
      for (const _ of Array.from({
        length: faker.datatype.number({ min: 2, max: 4 }),
      })) {
        const data: Partial<OptionValue> = {
          name: faker.unique(faker.name.firstName),
          option,
        };
        const value = new OptionValue();
        Object.assign(value, data);

        await factory(OptionValue)().create(value);
      }
    }
  }
}
