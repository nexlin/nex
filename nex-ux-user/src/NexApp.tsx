import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import nexConfig from "store/NexConfigStore";
import NexConfigStore from "store/NexConfigStore";
import { observer } from "mobx-react-lite";
import { NexDiv } from "component/base/NexBaseComponents";
import NexPageViewer from "page/NexPageViewer";
import NexPlayground from "page/NexPlayground";
import NexStoreProvider from "provider/NexStoreProvider";
import { useEffect, useState } from "react";
import { set } from "mobx";
//import nexTheme from "./theme/nexTheme";
//import { testWebPages } from "./test/data/testWebPages";

interface NexAppProps {
  //section: any;
  //theme?: any; // Optional theme prop, can be used for styling
  configStore: NexConfigStore | null; // Optional config store prop, can be used for configuration
  adminStore: NexConfigStore; // Optional config store prop, can be used for configuration
}

const NexApp: React.FC<NexAppProps> = observer((props) => {
  const { configStore, adminStore } = props;

  const [sections, setSections] = useState<any[]>([]);
  const [admin_sections, setAdminSections] = useState<any[]>([]);
  useEffect(() => {
    // Fetch configuration when the component mounts
    if (!configStore?.isReady) {
      setSections([]);
      //return;
    }
    //console.log("NexApp configStore:", configStore);
    configStore && setSections(configStore?.config?.websections || []);

    if (!adminStore.isReady) {
      setAdminSections([]);
      //return;
    }
    //console.log("NexApp adminStore:", JSON.stringify(adminStore.config.websections, null, 2));
    setAdminSections(adminStore?.config?.websections || []);

  }, [configStore, configStore?.isReady, adminStore, adminStore.isReady]);
  //const section = configStore?.config.websections[0];

  console.log("NexApp admin_config:", JSON.stringify(adminStore.config, null, 2));
  return (

    <NexDiv
      align="center"
      justify="center"
      width="100%"
      height="100%"
      overflow="hidden"
      style={{ position: "fixed", inset: 0, boxSizing: "border-box" }}
    >
      {admin_sections.length === 0 || !adminStore?.isReady ? (
        <div>Loading... {configStore?.isReady ? "Ready" : "Not Ready"}</div>
      ) : (
        <Router>
          <Routes>
            {configStore && <Route
              path="/main/*"
              element={
                <NexStoreProvider config={configStore!.config}>
                  <NexPageViewer
                    key={sections[0].name}
                    section={sections[0]}
                    isVisibleBorder={false}
                    isVisibleTitle={false}
                  />
                </NexStoreProvider>
              }
            />}
            <Route
              path="/_admin_/*"
              element={
                <NexStoreProvider config={adminStore.config}>
                  <NexPageViewer
                    key={admin_sections[0].name}
                    section={admin_sections[0]}
                    isVisibleBorder={false}
                    isVisibleTitle={false}
                  />
                </NexStoreProvider>
              }
            />
          </Routes>
        </Router>
      )}
    </NexDiv>

  );

});

export default NexApp;
