import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Button = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, height }) => (
  <div
    className="bg-white shadow-md rounded-lg border-2 border-gray-400"
    style={{ height: `${height}px` }}
  >
    {children}
  </div>
);

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const [asOfDate, setAsOfDate] = useState("2024-12-31");
  const [fundID, setFundID] = useState("3144");
  const [quickSightUrls, setQuickSightUrls] = useState([
    {
      url: "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9b8f468d-48fa-49d6-924e-acbf3efaea65?directory_alias=fos-reporting-qs",
      label: "Classification Systems",
    },
    {
      url: "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_71156084-7e9d-4efe-bb4f-efc12922c0e0?directory_alias=fos-reporting-qs",
      label: "Upcoming Wires",
    },
    {
      url: `https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_8aaeb34e-4efc-4980-a456-2e974f5e8fac?directory_alias=fos-reporting-qs&FundID=${fundID}&ToDate=${asOfDate}`,
      label: "Performance",
    },
  ]);

  const rowHeight = 100;

  useEffect(() => {
    setQuickSightUrls([
      {
        url: "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9b8f468d-48fa-49d6-924e-acbf3efaea65?directory_alias=fos-reporting-qs",
        label: "Classification Systems",
      },
      {
        url: "https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_71156084-7e9d-4efe-bb4f-efc12922c0e0?directory_alias=fos-reporting-qs",
        label: "Upcoming Wires",
      },
      {
        url: `https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/324168792528/dashboards/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7/sheets/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_9733dda9-d598-4210-baf2-e52e644c8bd9/visuals/4d00c4fc-5bc6-4015-87f9-1b2b7b3d49c7_8aaeb34e-4efc-4980-a456-2e974f5e8fac?directory_alias=fos-reporting-qs&FundID=${fundID}&ToDate=${asOfDate}`,
        label: "Performance",
      },
    ]);
  }, [fundID, asOfDate]);

  const reRenderIframes = () => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const baseUrl =
          quickSightUrls.find((item) =>
            item.url.includes(widget.url.split("?")[0])
          )?.url || widget.url.split("?")[0];
        return {
          ...widget,
          url: `${baseUrl}${
            baseUrl.includes("quicksight-embed-url3.com")
              ? `&fundID=${fundID}&asOfDate=${asOfDate}`
              : ""
          }`,
        };
      })
    );
  };

  const addWidget = (baseUrl) => {
    const newWidget = {
      i: `widget-${widgets.length}`,
      x: (widgets.length * 2) % 12,
      y: Infinity,
      w: 4,
      h: 3,
      minW: 2,
      minH: 2,
      maxW: 6,
      maxH: 6,
      url: baseUrl.includes("quicksight-embed-url3.com")
        ? `${baseUrl}&fundID=${fundID}&asOfDate=${asOfDate}`
        : baseUrl,
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.i !== id));
  };

  const handleLayoutChange = (layout) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const updatedWidget = layout.find((l) => l.i === widget.i);
        return updatedWidget ? { ...widget, ...updatedWidget } : widget;
      })
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <input
          type="date"
          value={asOfDate}
          onChange={(e) => setAsOfDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={fundID}
          onChange={(e) => setFundID(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="3144">3144</option>
          <option value="3145">3145</option>
          <option value="3146">3146</option>
        </select>
        <Button onClick={reRenderIframes} className="ml-2">
          Re-render Iframes
        </Button>
      </div>
      <div className="mb-4 space-x-2">
        {quickSightUrls.map((item, index) => (
          <Button key={index} onClick={() => addWidget(item.url)}>
            {item.label}
          </Button>
        ))}
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: widgets }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        draggableHandle=".drag-handle"
        isResizable={true}
        onLayoutChange={handleLayoutChange}
      >
        {widgets.map((widget) => (
          <div
            key={widget.i}
            data-grid={widget}
            className="relative rounded-lg border-2 border-gray-400"
          >
            <div className="drag-handle cursor-move bg-gray-300 text-center py-1 font-bold rounded-t-lg">
              Drag Me
            </div>
            <Card height={widget.h * rowHeight}>
              <iframe
                title="Amazon QuickSight"
                width="100%"
                height={widget.h * rowHeight - 10}
                src={widget.url}
                frameBorder="0"
                allowFullScreen
                key={widget.url} // Force iframe to reload when URL changes
              ></iframe>
              <div className="mt-2 text-center">
                <Button
                  className="bg-red-500"
                  onClick={() => removeWidget(widget.i)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
