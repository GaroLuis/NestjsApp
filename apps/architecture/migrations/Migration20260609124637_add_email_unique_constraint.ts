import { Migration } from '@mikro-orm/migrations';

export class Migration20260609124637_add_email_unique_constraint extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `alter table "user" add constraint "user_email_unique" unique ("email");`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
  }
}
