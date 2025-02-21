import React from "react";
import { RingLoader } from "react-spinners";

// Column configuration type
type TableColumn<T> = {
  title: string;
  dataIndex: keyof T;
  render?: (record: T) => React.ReactNode;
};

// Props type
type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  showDropdown?: boolean;
  dropdownOptions?: string[];
  onDropdownChange?: (selectedValue: string) => void;
  showButtons?: boolean;
  onButtonClick?: (record: T) => void;
};

const TableComponent = <T,>({
  columns,
  data,
  isLoading,
  showDropdown = false,
  dropdownOptions = [],
  onDropdownChange,
  showButtons = false,
  onButtonClick,
}: TableProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {showDropdown && dropdownOptions.length > 0 && (
        <div className="mb-4">
          <select
            className="border p-2 rounded-lg"
            onChange={(e) => onDropdownChange && onDropdownChange(e.target.value)}
          >
            {dropdownOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-left font-medium text-gray-700">
                {col.title}
              </th>
            ))}
            {showButtons && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-gray-900">
                  {col.render ? col.render(item) : (item[col.dataIndex] as string)}
                </td>
              ))}

              {showButtons && onButtonClick && (
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => onButtonClick(item)}
                  >
                    Action
                  </button>
                </td>
              )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;