import { ITab } from '../interfaces/tab.interface';

export class Tab {
  id: string;
  title: string;
  notification: number;
  isSelected: boolean;

  constructor(config?: ITab) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.notification = config ? config.notification : null;
    this.isSelected = false;
  }

  setNotification(value?: number | null): string {
    if (value) {
      this.notification = value;
    }
    return String(this.notification);
  }
}
