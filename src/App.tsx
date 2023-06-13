import { CacheProvider } from "@emotion/react";
import Form from "./components/form/Form";
import Layout from "./components/layout/Layout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  // @ts-ignore
  stylisPlugins: [prefixer, stylisRTLPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Form />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
