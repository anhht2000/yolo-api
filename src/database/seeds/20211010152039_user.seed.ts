import faker from '@faker-js/faker';
import { Role } from 'src/modules/user/entities/Role.entity';
import { User } from 'src/modules/user/entities/User.entity';
import { Gender } from 'src/modules/user/interfaces';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ROLES } from '../../configs/roles';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const rolesName = [ROLES.ADMIN, ROLES.USER];

    for (const role of rolesName) {
      const data: Partial<Role> = {
        name: role,
      };
      const value = new Role();
      Object.assign(value, data);

      await factory(Role)().create(value);
    }

    console.log('ngoài');
    //create user

    const roleUser = await connection.manager.findOne(Role, {
      where: { name: ROLES.USER },
    });
    const createUser = () => {
      const data: Partial<User> = {
        email: 'anhht@nec.vn',
        password: '12345678',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.city(2),
        gender: faker.random.arrayElement([Gender.MALE, Gender.FEMALE]),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber('0984-###-###'),
        id_card: '093138020980989',
        date_of_birth: faker.date.past(18),
        role: roleUser,
      };

      const user = new User();
      Object.assign(user, data);
      return user;
    };

    const roleAdmin = await connection.manager.findOne(Role, {
      where: { name: ROLES.ADMIN },
    });
    const createAdmin = () => {
      const data: Partial<User> = {
        email: 'anhht@admin.com',
        password: '12345678',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.city(2),
        gender: faker.random.arrayElement([Gender.MALE, Gender.FEMALE]),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber('0984-###-###'),
        id_card: '0931380209802321',
        date_of_birth: faker.date.past(18),
        role: roleAdmin,
      };

      const user = new User();
      Object.assign(user, data);

      return user;
    };

    await factory(User)().create(createAdmin());
    await factory(User)().create(createUser());
  }
}
