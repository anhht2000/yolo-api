/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/modules/user/entities/User.entity';
import { getConnection } from 'typeorm';

export function Unique(
  validation: Function,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: validation,
    });
  };
}

@ValidatorConstraint({ async: true })
export class ExistEmail implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const isExist = await getConnection().manager.findOne(User, {
      where: {
        email: value,
      },
    });

    if (!isExist) {
      return false;
    } else return true;
  }
}
