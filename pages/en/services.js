import TrPage from '../hizmetler'
import { useEffect } from 'react'
import Head from 'next/head'

// Force EN locale for this page
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}

export { getServerSideProps } from '../hizmetler'
