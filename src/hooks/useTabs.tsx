import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export type TabType = 'chat' | 'card' | 'order';

type Tab = {
  id: number;
  keyTab: string;
  heading: string;
  type: TabType;
};

type TabsContextProps = {
  tabs: Tab[];
  activeTabIndex: string | undefined;
  addTab: (id: number, type: TabType) => void;
  removeTab: (keyTabToRemove: string) => void;
  setActiveTab: (keyTab: string) => void;
};

type TabsProviderProps = {
  children: ReactNode;
};

type TabsState = {
  tabs: Tab[];
  active: string | undefined;
};

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs должен использоваться внутри TabsProvider');
  }
  return context;
};

export const TabsProvider = ({ children }: TabsProviderProps) => {
  const [tabsState, setTabsState] = useState<TabsState>({
    tabs: [
      {
        id: 0,
        keyTab: 'chat_0',
        heading: 'Чат',
        type: 'chat',
      },
    ],
    active: 'chat_0',
  });

  const scrollToLastReview = useCallback((keyTab: string) => {
    const elem = document.querySelector(`[data-scroll="${keyTab}"]`);
    elem?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const addTab = (id: number, type: TabType) => {
    const keyTab = `${type}_${id}`;

    const existingTabIndex = tabsState.tabs.findIndex(
      (tab) => tab.keyTab === keyTab && tab.type === type,
    );

    if (existingTabIndex !== -1) {
      setTabsState((prev) => ({ ...prev, active: keyTab }));
      setTimeout(() => scrollToLastReview(keyTab), 0);
    } else {
      const newTab = {
        id: id,
        heading: type === 'card' ? `Карточка № ${id}` : `Заказ № ${id}`,
        type: type,
        keyTab: keyTab,
      };
      setTabsState((prev) => ({
        active: keyTab,
        tabs: [...prev.tabs, newTab],
      }));
      setTimeout(() => scrollToLastReview(keyTab), 0);
    }
  };

  const removeTab = (keyTabToRemove: string) => {
    let updatedTabs: Tab[];
    let updatedActiveKeyTab: string | undefined;

    const isRemovedTabActive = tabsState.active === keyTabToRemove;

    if (isRemovedTabActive) {
      const removedTabIndex = tabsState.tabs.findIndex(
        (tab) => tab.keyTab === keyTabToRemove,
      );

      updatedTabs = tabsState.tabs.filter(
        (tab) => tab.keyTab !== keyTabToRemove,
      );

      if (removedTabIndex === tabsState.tabs.length - 1) {
        updatedActiveKeyTab =
          updatedTabs.length > 0
            ? updatedTabs[updatedTabs.length - 1].keyTab
            : '';
      } else {
        updatedActiveKeyTab = tabsState.tabs[removedTabIndex + 1]?.keyTab || '';
      }
    } else {
      updatedTabs = tabsState.tabs.filter(
        (tab) => tab.keyTab !== keyTabToRemove,
      );
      updatedActiveKeyTab = tabsState.active;
    }

    setTabsState(() => ({
      tabs: updatedTabs,
      active: updatedActiveKeyTab,
    }));
  };

  const setActiveTab = (keyTab: string) => {
    setTabsState({ ...tabsState, active: keyTab });
  };

  const contextValue = {
    tabs: tabsState.tabs,
    activeTabIndex: tabsState.active,
    addTab,
    removeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
