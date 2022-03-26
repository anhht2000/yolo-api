import { Role } from 'src/modules/user/entities/Role.entity';
import { define } from 'typeorm-seeding';

define(Role, () => {
  const value = new Role();

  return value;
});
