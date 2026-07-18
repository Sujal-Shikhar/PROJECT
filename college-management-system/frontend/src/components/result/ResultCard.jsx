import React from "react";

const ResultCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-1">
          {value}
        </h2>
      </div>

      <div
        className={`${color} h-14 w-14 rounded-xl flex items-center justify-center text-white`}
      >
        {icon}
      </div>
    </div>
  );
};

export default ResultCard;