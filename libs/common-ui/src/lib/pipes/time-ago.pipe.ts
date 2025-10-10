import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '—';

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - (date.getTime() - now.getTimezoneOffset() * 60 * 1000);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 10) return 'только что';
    if (diffSec < 60) return `${diffSec} сек. назад`;
    if (diffMin < 60) return `${diffMin} мин. назад`;
    if (diffHour < 24) return `${diffHour} ч. назад`;

    if (diffDay === 1) return 'вчера';
    if (diffDay < 7) return `${diffDay} дн. назад`;

    const diffWeek = Math.floor(diffDay / 7);
    if (diffWeek < 5) return `${diffWeek} нед. назад`;

    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} мес. назад`;

    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} г. назад`;
  }
}
