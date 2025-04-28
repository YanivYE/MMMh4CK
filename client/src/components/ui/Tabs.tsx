import { createContext, useContext, useState, ReactNode } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
  defaultValue,
  onValueChange,
  children,
}: {
  defaultValue: string;
  onValueChange?: (val: string) => void;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const setTab = (val: string) => {
    setActiveTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: setTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`inline-flex gap-1 rounded-lg p-1 ${className}`}>{children}</div>
);

export const TabsTrigger = ({
  value,
  children,
  className = "",
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside <Tabs>");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
        isActive
          ? "bg-indigo-600 text-white"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      } ${className}`}
    >
      {children}
    </button>
  );
};
