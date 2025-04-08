import { getSheetData } from '@/lib/google/sheets'

// Define the structure of the main data
export interface MainData {
  name: string
  title: string
  personalDescription: string
  cvLink: string
  contactMe: string
  githubUsername: string
  githubProfile: string
  linkedinProfile: string
  emailAddress: string
}

// Column indices in the spreadsheet
const COLUMNS = {
  NAME: 0,
  TITLE: 1,
  PERSONAL_DESCRIPTION: 2,
  CV_LINK: 3,
  CONTACT_ME: 4,
  GITHUB_USERNAME: 5,
  GITHUB_PROFILE: 6,
  LINKEDIN_PROFILE: 7,
  EMAIL_ADDRESS: 8
}

// Default values to use as fallbacks
const DEFAULT_VALUES: MainData = {
  name: 'João Melo',
  title: 'Software Developer',
  personalDescription: "I'm a fullstack developer with 5 years of experience, primarily focused on backend development.",
  cvLink: '#',
  contactMe: '#contact',
  githubUsername: process.env.GITHUB_USERNAME || 'jhonas8',
  githubProfile: process.env.GITHUB_PROFILE || 'https://github.com/jhonas8',
  linkedinProfile: process.env.LINKEDIN_PROFILE || 'https://www.linkedin.com/in/joao-melo-ribeiro/',
  emailAddress: process.env.EMAIL_ADDRESS || 'joao.victor.ribeiro.melo@joaomeloltda.com'
}

/**
 * Fetch and parse main data from the Google Sheet
 * @returns The main data with fallbacks to environment variables when necessary
 */
export async function getMainData(): Promise<MainData> {
  console.log('Fetching main data from Google Sheets...')
  
  try {
    const sheetData = await getSheetData('main')
    
    // Debug the received data
    console.log(`Received sheet data with ${sheetData.values.length} rows`)
    if (sheetData.values.length > 0) {
      console.log(`Header row has ${sheetData.values[0].length} columns`)
    }
    
    // If we have less than 2 rows (header + data), return defaults
    if (sheetData.values.length < 2) {
      console.warn('Main sheet data is missing or incomplete. Using default values.')
      return DEFAULT_VALUES
    }
    
    // Debug the data row
    console.log(`Data row has ${sheetData.values[1].length} columns`)
    
    const row = sheetData.values[1] // Get the second row (first row is headers)
    
    // Create the data object, using fallbacks for any missing values
    const data = {
      name: row[COLUMNS.NAME] || DEFAULT_VALUES.name,
      title: row[COLUMNS.TITLE] || DEFAULT_VALUES.title,
      personalDescription: row[COLUMNS.PERSONAL_DESCRIPTION] || DEFAULT_VALUES.personalDescription,
      cvLink: row[COLUMNS.CV_LINK] || DEFAULT_VALUES.cvLink,
      contactMe: row[COLUMNS.CONTACT_ME] || DEFAULT_VALUES.contactMe,
      githubUsername: row[COLUMNS.GITHUB_USERNAME] || DEFAULT_VALUES.githubUsername,
      githubProfile: row[COLUMNS.GITHUB_PROFILE] || DEFAULT_VALUES.githubProfile,
      linkedinProfile: row[COLUMNS.LINKEDIN_PROFILE] || DEFAULT_VALUES.linkedinProfile,
      emailAddress: row[COLUMNS.EMAIL_ADDRESS] || DEFAULT_VALUES.emailAddress
    }
    
    console.log('Successfully parsed main data')
    return data
  } catch (error) {
    console.error('Error fetching or parsing main data:', error)
    console.warn('Using default values due to error')
    return DEFAULT_VALUES
  }
} 