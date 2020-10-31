import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Theme from "styles/Theme";
import App from "next/app";
import "../styles/index.scss";
import Head from "next/head";
import { ViewportContext, ViewportContextInterface } from "misc/viewport";

interface AppState {
  viewport: ViewportContextInterface;
}

class PuremaApp extends App<{}, {}, AppState> {
  state = {
    viewport: {
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    },
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
          <ThemeProvider theme={Theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ViewportContext.Provider>
      </>
    );
  }
}

export default PuremaApp;
