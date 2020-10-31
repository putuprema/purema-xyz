import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Head, Html, Main, NextScript, DocumentContext } from "next/document";
import React from "react";
import { Fragment } from "react";

interface DocumentProps {
  isProduction: boolean;
}

class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  setGoogleTags() {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());   
      gtag('config', 'UA-165287220-1');
      `,
    };
  }

  render() {
    const { isProduction } = this.props;
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <meta name="theme-color" content="#ff4d4d" />
          <meta name="keyword" content="it, coder, programmer, web developer, java, spring, react, typescript"></meta>
          <meta name="description" content="An ambitious, always-learning developer with great attention to detail. "></meta>
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Putu Prema" />
          <meta property="og:description" content="An ambitious, always-learning developer with great attention to detail. " />
          <meta property="og:image" content="" />
          <meta property="og:url" content="https://purema.xyz/" />
          <meta property="og:site_name" content="Putu Prema" />
          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:title" content="Putu Prema" />
          <meta name="twitter:description" content="An ambitious, always-learning developer with great attention to detail. " />
          <meta name="twitter:image" content="" />
          <meta itemProp="name" content="Putu Prema"></meta>
          <meta itemProp="description" content="An ambitious, always-learning developer with great attention to detail. "></meta>
          <meta itemProp="image" content=""></meta>
          {isProduction && (
            <Fragment>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-165287220-1"></script>
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
