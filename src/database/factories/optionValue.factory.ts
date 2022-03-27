import { OptionValue } from 'src/modules/option/entities/OptionValue.entity';
import { define } from 'typeorm-seeding';

define(OptionValue, () => {
  const value = new OptionValue();

  return value;
});
