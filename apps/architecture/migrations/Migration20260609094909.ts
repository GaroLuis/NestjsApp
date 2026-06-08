import { Migration } from '@mikro-orm/migrations';

export class Migration20260609094909 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "user" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, primary key ("id"));`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }
}
