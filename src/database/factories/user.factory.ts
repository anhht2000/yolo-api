import { User } from 'src/modules/user/entities/User.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const value = new User();

  return value;
});
