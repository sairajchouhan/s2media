import Head from 'next/head'
import { Button } from '../../components/atoms/Button'
import { PageNav } from '../../components/molecules/Page'
import { PageLayout } from '../../components/molecules/Page/page-layout'
import { useToast } from '../../context/toastContext'

const Messages = () => {
  const toast = useToast()
  return (
    <PageLayout>
      <Head>
        <title>Messages / S2Media</title>
      </Head>
      <PageNav title="Messages" />
      <main className="px-2 py-3">
        <Button
          onClick={() => {
            toast({
              message: 'test jest',
              type: 'error',
            })
          }}
        >
          Click Me
        </Button>
      </main>
    </PageLayout>
  )
}

export default Messages
