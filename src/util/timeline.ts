// Where each job sits on the career timeline: pure, so it can be tested
// without rendering. Positions are pixels from the top, which is today.

const PIXELS_PER_YEAR = 60;
const MIN_CARD_HEIGHT = 100;
const MOBILE_CARD_GAP = 10;
// A grey dot asks for the missing brand colour; an invented one would hide it.
const NO_COLOR = 'var(--border)';

interface Job {
  data: { from: Date | string; to?: Date | string; color?: string; hide?: boolean };
}

export type Side = 'left' | 'right';

export interface PlacedJob<T extends Job> {
  job: T;
  color: string;
  top: number;
  height: number;
  mobileTop: number;
  side: Side;
}

export interface YearMark {
  year: number;
  top: number;
  color: string | null;
}

export interface Timeline<T extends Job> {
  jobs: PlacedJob<T>[];
  years: YearMark[];
  today: { top: number; color: string | null };
  line: { start: number; end: number };
  height: number;
  mobileHeight: number;
}

export function layoutTimeline<T extends Job>(career: T[], today: Date): Timeline<T> {
  const spans = career
    .filter((job) => !job.data.hide)
    .map((job) => ({
      job,
      color: job.data.color || NO_COLOR,
      from: new Date(job.data.from),
      to: job.data.to ? new Date(job.data.to) : today,
    }))
    .sort((a, b) => b.from.getTime() - a.from.getTime());

  const minYear = Math.min(...spans.flatMap((span) => [span.from.getFullYear(), span.to.getFullYear()]));
  const maxYear = today.getFullYear() + (today.getMonth() + 1) / 12;
  const positionOf = (date: Date) =>
    (maxYear - (date.getFullYear() + date.getMonth() / 12)) * PIXELS_PER_YEAR;

  const jobs = placeJobs();
  const todayTop = positionOf(today);
  const mobileLineEnd = Math.max(...jobs.map((job) => job.mobileTop + Math.max(job.height, MIN_CARD_HEIGHT)));

  return {
    jobs,
    years: yearMarks(),
    today: { top: todayTop, color: spans.find((span) => !span.job.data.to)?.color ?? null },
    line: {
      start: Math.min(todayTop, ...jobs.map((job) => job.top)),
      end: Math.max(...jobs.map((job) => job.top + job.height)),
    },
    height: (maxYear - minYear) * PIXELS_PER_YEAR,
    mobileHeight: mobileLineEnd + 50,
  };

  // On mobile every card shares one column, so each starts below the last.
  function placeJobs(): PlacedJob<T>[] {
    return spans.reduce<PlacedJob<T>[]>((placed, span, index) => {
      const top = positionOf(span.to);
      const height = positionOf(span.from) - top;
      const previous = placed.at(-1);
      const previousBottom = previous ? previous.mobileTop + Math.max(previous.height, MIN_CARD_HEIGHT) : 0;
      const mobileTop = Math.max(top, previousBottom + MOBILE_CARD_GAP);
      const side: Side = index % 2 === 0 ? 'right' : 'left';
      return [...placed, { job: span.job, color: span.color, top, height, mobileTop, side }];
    }, []);
  }

  // The oldest year is left out, or its dot dangles below the line; the
  // current one too while today's marker is close enough to overlap it.
  function yearMarks(): YearMark[] {
    const currentYear = today.getFullYear();
    return Array.from({ length: currentYear - minYear }, (_, i) => currentYear - i)
      .filter((year) => year !== currentYear || today.getMonth() >= 2)
      .map((year) => ({ year, top: positionOf(new Date(year, 0, 1)), color: colorOf(year) }));
  }

  function colorOf(year: number): string | null {
    const january = new Date(year, 0, 1);
    return spans.find((span) => span.from <= january && january < span.to)?.color ?? null;
  }
}
