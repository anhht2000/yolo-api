import { Option } from 'src/modules/option/entities/Option.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateOptions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const dataOption = ['Size', 'Color'];

    for (const i in dataOption) {
      const data: Partial<Option> = {
        name: dataOption[i],
      };
      const option = new Option();
      Object.assign(option, data);

      await factory(Option)().create(option);
    }
  }
}
