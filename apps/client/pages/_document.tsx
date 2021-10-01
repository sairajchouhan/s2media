import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <title>S2Media</title>
        <body className={process.env.NODE_ENV !== 'production' ? 'debug-screens' : ''}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
