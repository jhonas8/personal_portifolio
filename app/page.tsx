import { getMainData, MainData } from "@/lib/data/main"
import { getExperiencesData, Experience } from "@/lib/data/experiences"
import { HomeContent } from "@/components/home-content"

// This is important for server side data fetching
export const revalidate = 3600 // Revalidate every hour

// Server component with async data fetching
export default async function Home() {
  console.log('Starting Home component rendering...')

  let mainData: MainData | undefined
  let experiencesData: Experience[] | undefined

  try {
    // Pre-fetch the data on the server
    console.log('Fetching main data for Home page...')
    mainData = await getMainData()
    console.log('Successfully fetched main data')
  } catch (error) {
    console.error('Error pre-fetching main data:', error)
    console.log('Continuing with undefined main data - will use defaults')
    mainData = undefined
  }

  try {
    // Pre-fetch experiences data
    console.log('Fetching experiences data for Home page...')
    experiencesData = await getExperiencesData()
    console.log('Successfully fetched experiences data')
  } catch (error) {
    console.error('Error pre-fetching experiences data:', error)
    console.log('Continuing with undefined experiences data')
    experiencesData = undefined
  }

  return <HomeContent 
    initialMainData={mainData} 
    initialExperiencesData={experiencesData} 
  />
}

