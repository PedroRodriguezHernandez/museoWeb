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
  //TODO
  /*getMuseumFlow(start?: Date, end?: Date): { label: string; data: number }[] {
    return this.museums
      .filter(entry => {
        const entryDate = entry.date;
        const isAfterStart = !start || new Date(entryDate).getTime() >= start.getTime();
        const isBeforeEnd = !end || new Date(entryDate).getTime() <= end.getTime();
         return isAfterStart && isBeforeEnd;
      })
      .map(entry => ({
        label: new Date(entry.date).toISOString().split('T')[0],
        data: entry.current_capacity,
      }));
  }
  */
  getVisitsByAge(options?: {
    startDate?: Date;
    endDate?: Date;
    allowedAges?: string[];
  }): { label: string; data: number }[] {
    const { startDate, endDate, allowedAges } = options || {};
    const visitsMap: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const isAfterStart = !startDate || new Date(ticket.buy_at).getTime() >= startDate.getTime();
        const isBeforeEnd = !endDate || new Date(ticket.buy_at).getTime() <= endDate.getTime();
        const isAllowedAge =
          !allowedAges || allowedAges.includes(ticket.age ?? 'unknown');
        return isAfterStart && isBeforeEnd && isAllowedAge;
      })
      .forEach(ticket => {
        const ageGroup = ticket.age ?? 'unknown';
        visitsMap[ageGroup] = (visitsMap[ageGroup] || 0) + 1;
      });

    return Object.entries(visitsMap).map(([age, visits]) => ({
      label: age,
      data: visits
    }));
  }


  getVisitsByAgePerDay(options?: {
    startDate?: Date;
    endDate?: Date;
    allowedAges?: string[];
  }): { labels: string[]; categories: Record<string, number[]> } {
    const { startDate, endDate, allowedAges } = options || {};
    const grouped: Record<string, Record<string, number>> = {};

    this.tickets
      .filter(ticket => {
        const isAfterStart =
          !startDate || new Date(ticket.buy_at)>= startDate;
        const isBeforeEnd =
          !endDate || new Date(ticket.buy_at).getTime() <= endDate.getTime();
        const isAllowedAge =
          !allowedAges || allowedAges.includes(ticket.age ?? 'unknown');
        return isAfterStart && isBeforeEnd && isAllowedAge;
      })
      .forEach(ticket => {
        const dateKey = new Date(ticket.buy_at).toISOString().split('T')[0];
        const ageGroup = ticket.age ?? 'unknown';

        if (!grouped[dateKey]) {
          grouped[dateKey] = {};
        }

        grouped[dateKey][ageGroup] = (grouped[dateKey][ageGroup] || 0) + 1;
      });

    const labels = Object.keys(grouped).sort();

    const allCategories = new Set<string>();
    Object.values(grouped).forEach(ageGroups => {
      Object.keys(ageGroups).forEach(cat => allCategories.add(cat));
    });

    const categories: Record<string, number[]> = {};
    allCategories.forEach(cat => {
      categories[cat] = labels.map(label => grouped[label][cat] ?? 0);
    });

    return { labels, categories };
  }


  getTicketsSoldByDay(options?: { startDate?: Date; endDate?: Date }): Array<{ label: string; data: number }> {
    const { startDate, endDate } = options || {};
    const grouped: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const day = ticket.buy_at;
        const afterStart = !startDate || new Date(day).getTime() >= startDate.getTime();
        const beforeEnd = !endDate || new Date(day).getTime() <= endDate.getTime();
        return afterStart && beforeEnd;
      })
      .forEach(ticket => {
        const dayKey = new Date(ticket.buy_at).toISOString().split('T')[0];
        grouped[dayKey] = (grouped[dayKey] || 0) + 1;
      });

    return Object.entries(grouped).map(([day, ticketsSold]) => ({
      label: day,
      data: ticketsSold,
    }));
  }

  getTotalSalesByDay(options?: { startDate?: Date; endDate?: Date }): Array<{ label: string; data: number }> {
    const { startDate, endDate } = options || {};
    const grouped: Record<string, number> = {};

    this.tickets
      .filter(ticket => {
        const day = ticket.buy_at;
        const afterStart = !startDate || new Date(day).getTime() >= startDate.getTime();
        const beforeEnd = !endDate ||  new Date(day).getTime() >= endDate.getTime();
        return afterStart && beforeEnd;
      })
      .forEach(ticket => {
        const dayKey = new Date(ticket.buy_at).toISOString().split('T')[0];
        grouped[dayKey] = (grouped[dayKey] || 0) + ticket.price;
      });

    return Object.entries(grouped).map(([day, totalPrice]) => ({
      label: day,
      data: totalPrice,
    }));
  }

  getVisitsPerExhibition(options?: {
    exposures?: string[];
    exhibitionTitles?: string[];
  }): Array<{ label: string; data: number }> {
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
      label: ex.title,
      data: ex.views ?? 0,
    }));
  }


  getDailyViewsPerExposure(options?: {
    exposureNames?: string[];
    startDate?: Date;
    endDate?: Date;
  }): { labels: string[]; categories: Record<string, number[]> } {
    const { exposureNames, startDate, endDate } = options || {};

    let filteredExposures = this.exposures;
    if (exposureNames && exposureNames.length > 0) {
      const lowerNames = exposureNames.map(n => n.toLowerCase());
      filteredExposures = filteredExposures.filter(exposure =>
        lowerNames.some(n => exposure.name.toLowerCase().includes(n))
      );
    }

    const combinedByDate: Record<string, Record<string, number>> = {};

    filteredExposures.forEach(exposure => {
      const relatedTitles = this.exhibitions
        .filter(ex => ex.id && (exposure.list ?? []).includes(ex.id))
        .map(ex => ex.title);

      const filteredViews = this.getDailyViewsFiltered({
        exhibitionTitles: relatedTitles,
        startDate,
        endDate,
      });

      filteredViews.labels.forEach((date, idx) => {
        let totalForDate = 0;
        for (const category in filteredViews.categories) {
          totalForDate += filteredViews.categories[category][idx] ?? 0;
        }

        if (!combinedByDate[date]) {
          combinedByDate[date] = {};
        }
        combinedByDate[date][exposure.name] = totalForDate;
      });
    });

    const labels = Object.keys(combinedByDate).sort();

    const allCategories = new Set<string>();
    Object.values(combinedByDate).forEach(dateMap => {
      Object.keys(dateMap).forEach(expName => allCategories.add(expName));
    });

    const categories: Record<string, number[]> = {};
    allCategories.forEach(expName => {
      categories[expName] = labels.map(date => combinedByDate[date][expName] ?? 0);
    });

    return { labels, categories };
  }




  getVisitsPerExposure(options?: {
    exposureNames?: string[];
  }): Array<{ label: string; data: number }> {
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
      }).reduce((sum, ex) => sum + ex.data, 0);

      return {
        label: exposure.name,
        data: totalViews
      };
    });
  }
  getDailyViewsFiltered(options?: {
    exposures?: string[];
    exhibitionTitles?: string[];
    startDate?: Date;
    endDate?: Date;
  }): { labels: string[]; categories: Record<string, number[]> } {
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

    const combinedByDate: Record<string, Record<string, number>> = {};

    filtered.forEach(ex => {
      const dailyViews = ex.daily_views || {};
      Object.entries(dailyViews).forEach(([date, count]) => {
        if (
          (!startDate || new Date(date).getTime() >= startDate.getTime()) &&
          (!endDate || new Date(date).getTime() <= endDate.getTime())
        ) {
          if (!combinedByDate[date]) {
            combinedByDate[date] = {};
          }
          combinedByDate[date][ex.title] = count as number;
        }
      });
    });

    const labels = Object.keys(combinedByDate).sort();

    const allCategories = new Set<string>();
    Object.values(combinedByDate).forEach(catMap => {
      Object.keys(catMap).forEach(cat => allCategories.add(cat));
    });

    const categories: Record<string, number[]> = {};
    allCategories.forEach(cat => {
      categories[cat] = labels.map(label => combinedByDate[label][cat] ?? 0);
    });

    return { labels, categories };
  }
}
