import faker from '@faker-js/faker';
import { Option } from 'src/modules/option/entities/Option.entity';
import { define } from 'typeorm-seeding';

define(Option, () => {
  const option = new Option();

  return option;
});
