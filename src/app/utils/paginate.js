import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
/*
items - создаем новый массив,
pageNumber - номер страницы (currentPage(1)),
pageSize - размер страниц (2);
startIndex - начальный индекс элементов, чтоб разбить данные на страницы (0);
.slice - забрать элементы для текущей страницы - отрежет массив, начиная со
startIndex;
.take() - заберет нужные элементы для страницы из pageSize;
value() - из lodash массива возвращает обычный массив.
 */
