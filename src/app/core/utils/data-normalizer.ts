import {User} from '../intefaces/user-interface';
import {Tickets} from '../intefaces/tickets-interface';
import {Exhibition} from '../intefaces/exposition-interface';
import {Museum} from '../intefaces/museum-interface';
import {Exposure} from '../intefaces/exposure-interface';

export class DataNormalizer {
  private exposures: Exposure[];
  private tickets: Tickets[];
  private exhibitions: Exhibition[];
  private museums: Museum[];

  constructor(
    exposures: Exposure[],
    tickets: Tickets[],
    exhibitions: Exhibition[],
    museums: Museum[]
  ) {
    this.exposures = exposures;
    this.tickets = tickets;
    this.exhibitions = exhibitions;
    this.museums = museums;
  }

  getMuseumFlow(start?: Date, end?: Date): { date: string; visits: number }[] {
    return this.museums
      .filter(entry => {
        const entryDate = entry.date;
        const isAfterStart = !start || entryDate >= start;
        const isBeforeEnd = !end || entryDate <= end;
        return isAfterStart && isBeforeEnd;
      })
      .map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        visits: entry.current_capacity,
      }));
  }
  getVisitsByAge(options?: {
    startDate?: Date;
    endDate?: Date;
    allowedAges?: string[];
  }): Record<string, number> {
    const { startDate, endDate, allowedAges } = options || {};
    const visitsByAge: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const isAfterStart = !startDate || ticket.buy_at >= startDate;
        const isBeforeEnd = !endDate || ticket.buy_at <= endDate;
        const isAllowedAge =
          !allowedAges || allowedAges.includes(ticket.age ?? 'unknown');
        return isAfterStart && isBeforeEnd && isAllowedAge;
      })
      .forEach(ticket => {
        const ageGroup = ticket.age ?? 'unknown';
        visitsByAge[ageGroup] = (visitsByAge[ageGroup] || 0) + 1;
      });

    return visitsByAge;
  }

  getVisitsByAgePerDay(options?: {
    startDate?: Date;
    endDate?: Date;
    allowedAges?: string[];
  }): Array<Record<string, string | number>> {
    const { startDate, endDate, allowedAges } = options || {};
    const grouped: Record<string, Record<string, number>> = {};

    this.tickets
      .filter(ticket => {
        const isAfterStart = !startDate || ticket.buy_at >= startDate;
        const isBeforeEnd = !endDate || ticket.buy_at <= endDate;
        const isAllowedAge =
          !allowedAges || allowedAges.includes(ticket.age ?? 'unknown');
        return isAfterStart && isBeforeEnd && isAllowedAge;
      })
      .forEach(ticket => {
        const dateKey = ticket.buy_at.toISOString().split('T')[0];
        const ageGroup = ticket.age ?? 'unknown';

        if (!grouped[dateKey]) {
          grouped[dateKey] = {};
        }

        grouped[dateKey][ageGroup] = (grouped[dateKey][ageGroup] || 0) + 1;
      });

    return Object.entries(grouped).map(([date, ageGroups]) => ({
      date,
      ...ageGroups,
    }));
  }

  getTicketsSoldByDay(options?: { startDate?: Date; endDate?: Date }): Array<{ day: string; ticketsSold: number }> {
    const { startDate, endDate } = options || {};
    const grouped: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const day = ticket.buy_at;
        const afterStart = !startDate || day >= startDate;
        const beforeEnd = !endDate || day <= endDate;
        return afterStart && beforeEnd;
      })
      .forEach(ticket => {
        const dayKey = ticket.buy_at.toISOString().split('T')[0];
        grouped[dayKey] = (grouped[dayKey] || 0) + 1;
      });

    return Object.entries(grouped).map(([day, ticketsSold]) => ({
      day,
      ticketsSold,
    }));
  }

  getTotalSalesByDay(options?: { startDate?: Date; endDate?: Date }): Array<{ day: string; totalPrice: number }> {
    const { startDate, endDate } = options || {};
    const grouped: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const day = ticket.buy_at;
        const afterStart = !startDate || day >= startDate;
        const beforeEnd = !endDate || day <= endDate;
        return afterStart && beforeEnd;
      })
      .forEach(ticket => {
        const dayKey = ticket.buy_at.toISOString().split('T')[0];
        grouped[dayKey] = (grouped[dayKey] || 0) + ticket.price;
      });

    return Object.entries(grouped).map(([day, totalPrice]) => ({
      day,
      totalPrice,
    }));
  }

  getVisitsPerExhibition(options?: {
    exposures?: string[];
    exhibitionTitles?: string[];
  }): Array<{ title: string; totalViews: number }> {
    const { exposures, exhibitionTitles } = options || {};

    let filtered = this.exhibitions;

    if (exposures && exposures.length > 0) {
      filtered = filtered.filter(ex => exposures.includes(ex.exposure));
    }

    if (exhibitionTitles && exhibitionTitles.length > 0) {
      const lowerTitles = exhibitionTitles.map(title => title.toLowerCase());
      filtered = filtered.filter(ex =>
        lowerTitles.some(t => ex.title.toLowerCase().includes(t))
      );
    }

    return filtered.map(ex => ({
      title: ex.title,
      totalViews: ex.views ?? 0,
    }));
  }


  getDailyViewsFiltered(options?: {
    exposures?: string[];
    exhibitionTitles?: string[];
    startDate?: string;
    endDate?: string;
  }): Array<{ title: string; dailyViews: Record<string, number> }> {
    const { exposures, exhibitionTitles, startDate, endDate } = options || {};

    let filtered = this.exhibitions;

    if (exposures && exposures.length > 0) {
      filtered = filtered.filter(ex => exposures.includes(ex.exposure));
    }

    if (exhibitionTitles && exhibitionTitles.length > 0) {
      const lowerTitles = exhibitionTitles.map(t => t.toLowerCase());
      filtered = filtered.filter(ex =>
        lowerTitles.some(t => ex.title.toLowerCase().includes(t))
      );
    }

    return filtered.map(ex => {
      const dailyViews = ex.daily_views || {};
      const filteredDailyViews: Record<string, number> = {};

      Object.entries(dailyViews).forEach(([date, count]) => {
        if (
          (!startDate || date >= startDate) &&
          (!endDate || date <= endDate)
        ) {
          filteredDailyViews[date] = count as number;
        }
      });

      return {
        title: ex.title,
        dailyViews: filteredDailyViews,
      };
    });
  }

  getVisitsPerExposure(options?: {
    exposureNames?: string[];
  }): Array<{ exposure: string; totalViews: number }> {
    const { exposureNames } = options || {};

    let filteredExposures = this.exposures;

    if (exposureNames && exposureNames.length > 0) {
      const lowerNames = exposureNames.map(name => name.toLowerCase());
      filteredExposures = filteredExposures.filter(exposure =>
        lowerNames.some(n => exposure.name.toLowerCase().includes(n))
      );
    }

    return filteredExposures.map(exposure => {
      const filteredExhibitions = this.exhibitions.filter(
        ex => ex.id && (exposure.list ?? []).includes(ex.id)
      );

      const totalViews = this.getVisitsPerExhibition({
        exhibitionTitles: filteredExhibitions.map(ex => ex.title)
      }).reduce((sum, ex) => sum + ex.totalViews, 0);

      return {
        exposure: exposure.name,
        totalViews
      };
    });
  }

  getDailyViewsPerExposure(options?: {
    exposureNames?: string[];
    startDate?: string;
    endDate?: string;
  }): Array<{ exposure: string; dailyViews: Record<string, number> }> {
    const { exposureNames, startDate, endDate } = options || {};

    let filteredExposures = this.exposures;

    if (exposureNames && exposureNames.length > 0) {
      const lowerNames = exposureNames.map(name => name.toLowerCase());
      filteredExposures = filteredExposures.filter(exposure =>
        lowerNames.some(n => exposure.name.toLowerCase().includes(n))
      );
    }

    return filteredExposures.map(exposure => {
      const relatedExhibitions = this.exhibitions.filter(
        ex => ex.id && (exposure.list ?? []).includes(ex.id)
      );

      const views = this.getDailyViewsFiltered({
        exhibitionTitles: relatedExhibitions.map(ex => ex.title),
        startDate,
        endDate,
      });

      const combinedViews: Record<string, number> = {};

      views.forEach(entry => {
        Object.entries(entry.dailyViews).forEach(([date, count]) => {
          combinedViews[date] = (combinedViews[date] || 0) + count;
        });
      });

      return {
        exposure: exposure.name,
        dailyViews: combinedViews,
      };
    });
  }





}
