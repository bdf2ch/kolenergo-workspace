export class Backup {
  backup: any;

  constructor() {
    this.backup = {
      data: {},

      /**
       * Инициалиализвция свойств для бэкапа
       * @param {string[]} fields
       */
      setup: (fields: string[]) => {
        fields.forEach((field: string) => {
          if (this[field]) {
             this.backup.data[field] = JSON.stringify(this[field]);
          }
        });
      },

      /**
       * Восстановления значения свойств из бэкапа
       */
      restore: () => {
        for (const field in this.backup.data) {
          this[field] = JSON.parse(this.backup.data[field]);
        }
      }
    };
  }
}
