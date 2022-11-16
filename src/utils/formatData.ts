const adjustZeroes = (number: number, length: number) => {
  let result = number.toString();
  const count = length - result.length;
  for (let i = 0; i < count; i++) result = '0' + result;
  return result;
};
const calculateDiffDate = (first: Date, second: Date) => {
  const msInDay = 1000 * 60 * 60 * 24;
  const utcFirst = Date.UTC(
    first.getFullYear(),
    first.getMonth(),
    first.getDate()
  );
  const utcSecond = Date.UTC(
    second.getFullYear(),
    second.getMonth(),
    second.getDate()
  );

  return Math.floor((utcFirst - utcSecond) / msInDay);
};

export const formatDate = (stringDate: string | undefined) => {
  if (stringDate === undefined || stringDate === null) return '';
  const date = new Date(stringDate);
  const today = new Date();
  const hours = adjustZeroes(date.getHours(), 2);
  const minutes = adjustZeroes(date.getMinutes(), 2);
  const diffDays = calculateDiffDate(today, date);
  const days =
    diffDays <= 0
      ? 'Сегодня'
      : diffDays <= 1
      ? 'Вчера'
      : `${diffDays} дня(-ей) назад`;
  return `${days}, ${hours}:${minutes}`;
};
