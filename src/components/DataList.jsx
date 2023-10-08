import React, { useEffect, useState } from "react";
import { Data } from "../data/Data";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";

const DataList = () => {
  const [data, setData] = useState([]);

  const [source, setSource] = useState({});

  const [yearAscending, setYearAscending] = useState(true);

  const [populationAscending, setPopulationAscending] = useState(true);

  const handleSortByYear = () => {
    const sortedData = [...data.data];
    sortedData.sort((a, b) => {
      if (yearAscending) {
        return a.Year - b.Year;
      } else {
        return b.Year - a.Year;
      }
    });

    setData({ ...data, data: sortedData });

    setYearAscending(!yearAscending);
  };

  const handleSortByPopulation = () => {
    const sortedData = [...data.data];
    sortedData.sort((a, b) => {
      if (populationAscending) {
        return a.Population - b.Population;
      } else {
        return b.Population - a.Population;
      }
    });

    setData({ ...data, data: sortedData });

    setPopulationAscending(!populationAscending);
  };

  useEffect(() => {
    Data()
      .then((data) => {
        setData(data);
        setSource(data.source[0].annotations);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container flex items-center justify-center h-auto">
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        
        {/* Table */}
        <div className="border-2 rounded-lg row-span-2 py-4 h-min">
          <div className="text-lg font-bold">Table Data</div>
          <div className="mx-3">
            <table>
              <thead className="border-b-2">
                <tr>
                  <th className="px-4 py-4">No.</th>
                  <th className="px-4 py-4">ID Nation</th>
                  <th className="px-4 py-4">Nation</th>
                  <th className="px-4 py-4">ID Year</th>
                  <th className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      Year
                      <button onClick={handleSortByYear}>
                        {yearAscending ? <RxTriangleDown /> : <RxTriangleUp />}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      Population
                      <button onClick={handleSortByPopulation}>
                        {populationAscending ? (
                          <RxTriangleDown />
                        ) : (
                          <RxTriangleUp />
                        )}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-4">Slug Nation</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item, index) => (
                  <tr key={index} className="border-b-2">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{item["ID Nation"]}</td>
                    <td className="px-4 py-4">{item.Nation}</td>
                    <td className="px-4 py-4">{item["ID Year"]}</td>
                    <td className="px-4 py-4">{item.Year}</td>
                    <td className="px-4 py-4">{item.Population}</td>
                    <td className="px-4 py-4">{item["Slug Nation"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col justify-start items-start text-xs italic text-gray-500 mt-2">
              <div>Source Name: {source["source_name"]}</div>
              <div className="text-left w-[600px]">
                Source Description: {source["source_description"]}
              </div>
              <div>Dataset Name: {source["dataset_name"]}</div>
              <div>
                Dataset Link:
                <a href={source["dataset_link"]}> {source["dataset_link"]}</a>
              </div>
              <div>Table ID: {source["table_id"]}</div>
              <div>Topic: {source.topic}</div>
              <div>Subtopic: {source.subtopic}</div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="border-2 rounded-lg px-2 py-4 gap-2 flex flex-col justify-center items-center">
          <div className="text-lg font-bold mb-2">Pie Chart</div>
          {Array.isArray(data.data) && data.data.length > 0 ? (
            <Pie
              data={{
                labels: data.data.map((item) => item.Year),
                datasets: [
                  {
                    label: "Population Data",
                    data: data.data.map((item) => item.Population),
                  },
                ],
              }}
            />
          ) : null}
        </div>

        {/* Line Chart */}
        <div className="border-2 rounded-lg py-4 px-2 h-min">
          <div className="text-lg font-bold mb-2">Line Chart</div>
          {Array.isArray(data.data) && data.data.length > 0 ? (
            <Line
              data={{
                labels: data.data.map((item) => item.Year),
                datasets: [
                  {
                    label: "Population data",
                    data: data.data.map((item) => item.Population),
                  },
                ],
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DataList;
