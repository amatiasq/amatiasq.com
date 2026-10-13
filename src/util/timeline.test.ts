import { expect, test } from 'bun:test';
import { layoutTimeline } from './timeline';

const today = new Date(2026, 5, 15);

function job(from: string, to?: string, color?: string) {
  return { data: { from, to, color } };
}

// Overlapping jobs, as a career has: the second starts before the first ends.
const career = [
  job('2015-01', '2019-06', '#f00'),
  job('2018-03', '2021-01', '#0f0'),
  job('2020-06', '2020-09'),
  job('2021-02', undefined, '#00f'),
];

test('no two cards overlap on mobile', () => {
  const { jobs } = layoutTimeline(career, today);

  for (const [previous, next] of jobs.slice(0, -1).map((job, i) => [job, jobs[i + 1]!])) {
    expect(next.mobileTop).toBeGreaterThanOrEqual(previous.mobileTop + Math.max(previous.height, 100));
  }
});

test('newest job first, and sides alternate', () => {
  const { jobs } = layoutTimeline(career, today);

  expect(jobs.map((placed) => placed.job.data.from)).toEqual(['2021-02', '2020-06', '2018-03', '2015-01']);
  expect(jobs.map((placed) => placed.side)).toEqual(['right', 'left', 'right', 'left']);
});

test('each year takes the colour of the job holding its January', () => {
  const { years, today: marker } = layoutTimeline(career, today);
  const colorOf = (year: number) => years.find((mark) => mark.year === year)?.color;

  expect(colorOf(2016)).toBe('#f00');
  expect(colorOf(2020)).toBe('#0f0');
  expect(colorOf(2022)).toBe('#00f');
  expect(marker.color).toBe('#00f');
});

test('a job with no colour paints grey, not an invented one', () => {
  const { jobs } = layoutTimeline(career, today);

  expect(jobs.find((placed) => !placed.job.data.color)?.color).toBe('var(--border)');
});

test('hidden jobs are left out', () => {
  const hidden = { data: { from: '2010-01', to: '2011-01', hide: true } };

  expect(layoutTimeline([...career, hidden], today).jobs).toHaveLength(career.length);
});
