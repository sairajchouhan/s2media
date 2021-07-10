import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="debug-screens">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
