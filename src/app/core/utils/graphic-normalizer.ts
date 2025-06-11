export interface ChartDataNormalized {
  labels: string[];
  values: number[];
}

export interface ChartDataNormalizedMulti {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export function normalizeVisitsByDate(data: { date: string; visits: number }[]): ChartDataNormalized {
  return {
    labels: data.map(d => d.date),
    values: data.map(d => d.visits),
  };
}

export function normalizeRecord(data: Record<string, number>): ChartDataNormalized {
  return {
    labels: Object.keys(data),
    values: Object.values(data),
  };
}

export function normalizeDayTickets(data: Array<{ day: string; ticketsSold: number }>): ChartDataNormalized {
  return {
    labels: data.map(d => d.day),
    values: data.map(d => d.ticketsSold),
  };
}

export function normalizeDayTotalPrice(data: Array<{ day: string; totalPrice: number }>): ChartDataNormalized {
  return {
    labels: data.map(d => d.day),
    values: data.map(d => d.totalPrice),
  };
}

export function normalizeMultiLineData(
  data: { exposure: string; dailyViews: Record<string, number | undefined> }[]
): ChartDataNormalizedMulti {
  const allDates = Array.from(
    new Set(data.flatMap(item => Object.keys(item.dailyViews)))
  ).sort();

  return {
    labels: allDates,
    datasets: data.map(item => ({
      label: item.exposure,
      data: allDates.map(date => item.dailyViews[date] ?? 0), // default a 0 si no hay valor
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
      fill: false
    }))
  };
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
}
