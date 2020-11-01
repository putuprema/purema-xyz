import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Theme from "styles/Theme";
import App from "next/app";
import "../styles/index.scss";
import Head from "next/head";
import { ViewportContext, ViewportContextInterface } from "misc/viewport";
import { bootstrapServices, ServicesContextInterface } from "services";
import { Services } from "services";
import ProgressBarIndicator from "components/ProgressBarIndicator";

interface AppState {
  viewport: ViewportContextInterface;
  services: ServicesContextInterface;
}

class PuremaApp extends App<{}, {}, AppState> {
  state = {
    viewport: {
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    },
    services: bootstrapServices(),
  };

  handleResize = () => {
    this.setState({
      viewport: {
        isDesktop: window.innerWidth >= 960,
        isTablet: window.innerWidth > 600 && window.innerWidth < 960,
        isMobile: window.innerWidth <= 600,
      },
    });
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    // resize event listener
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <CssBaseline />
        <ViewportContext.Provider value={this.state.viewport}>
          <Services.Provider value={this.state.services}>
            <ThemeProvider theme={Theme}>
              <ProgressBarIndicator />
              <Component {...pageProps} />
            </ThemeProvider>
          </Services.Provider>
        </ViewportContext.Provider>
      </>
    );
  }
}

export default PuremaApp;
