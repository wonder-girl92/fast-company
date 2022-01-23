import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) { // при выборе одного item
      onSort({
        ...selectedSort, // передаем в Онсорт новый объект
        order: selectedSort.order === "asc" // с сортировкой по умолчанию
          ? "desc" // и меняем, если сортир. была по asc при повторном нажатии на item
          : "asc" // при последующем нажатии выбираем по умолчанию asc
      });
    } else {
      onSort({ path: item, order: "asc" });// если меняем item на другой
    }
  };
  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <i className="bi bi-caret-down-fill"></i>;
      } else {
        return <i className="bi bi-caret-up-fill"></i>;
      }
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column} onClick={columns[column].path
            ? () => handleSort(columns[column].path)
            : undefined} // если есть св-во итер, то вешаем ф-ю обработчик события
          {...{ role: columns[column].path && "button" }}
          // если есть св-во итер, то добавляем роль кнопки
          scope="col">
            {columns[column].name} {renderSortArrow(selectedSort, columns[column].path)}
          </th>
        ))}
        {/* <th onClick={() => handleSort("name")} scope="col">Имя</th> */}
        {/* <th scope="col">Качества</th> */}
        {/* <th onClick={() => handleSort("profession.name")} scope="col">Профессия</th> */}
        {/* <th onClick={() => handleSort("completedMeetings")} scope="col">Встретился, раз</th> */}
        {/* <th onClick={() => handleSort("rate")} scope="col">Оценка</th> */}
        {/* <th onClick={() => handleSort("bookmark")} scope="col">Избранное</th> */}
        {/* <th scope="col">Удалить</th> */}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
