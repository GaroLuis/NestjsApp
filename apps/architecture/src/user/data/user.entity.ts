import { defineEntity, p } from '@mikro-orm/core';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    email: p.string(),
    password: p.string(),
  },
});

export class UserEntity extends UserSchema.class {}
UserSchema.setClass(UserEntity);

UserSchema.addHook('beforeCreate', async (args) => {
  if (args.entity.password) {
    args.entity.password = await bcrypt.hash(args.entity.password, saltRounds);
  }
});

UserSchema.addHook('beforeUpdate', async (args) => {
  if (args.changeSet?.payload.password && args.entity.password) {
    args.entity.password = await bcrypt.hash(args.entity.password, saltRounds);
  }
});
