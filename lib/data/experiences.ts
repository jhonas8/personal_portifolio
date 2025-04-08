import { getSheetData } from '@/lib/google/sheets'

// Define the structure of an experience item
export interface Experience {
  title: string
  description: string
  startDate: string
  endDate: string
  company: string
  skills: string[]
}

// Column indices in the spreadsheet
const COLUMNS = {
  TITLE: 0,
  DESCRIPTION: 1,
  START_DATE: 2,
  END_DATE: 3,
  COMPANY: 4,
  TAGS: 5
}

/**
 * Fetch and parse experiences data from the Google Sheet
 * @returns Array of experience items
 */
export async function getExperiencesData(): Promise<Experience[]> {
  console.log('Fetching experiences data from Google Sheets...')
  
  try {
    const sheetData = await getSheetData('experiences')
    
    // Debug the received data
    console.log(`Received sheet data with ${sheetData.values.length} rows`)
    
    // If we have less than 2 rows (header + at least one data row), return empty array
    if (sheetData.values.length < 2) {
      console.warn('Experiences sheet data is missing or incomplete.')
      return []
    }
    
    // Skip the header row (index 0) and map the rest to Experience objects
    const experiences = sheetData.values.slice(1).map((row) => {
      // Parse tags/skills - they might be comma separated values
      const skillsString = row[COLUMNS.TAGS] || ''
      const skills = skillsString.split(',').map(tag => tag.trim()).filter(Boolean)
      
      // Format date range for display
      const startDate = row[COLUMNS.START_DATE] || ''
      const endDate = row[COLUMNS.END_DATE] || 'Present'
      
      return {
        title: row[COLUMNS.TITLE] || '',
        description: row[COLUMNS.DESCRIPTION] || '',
        startDate,
        endDate,
        company: row[COLUMNS.COMPANY] || '',
        skills
      }
    })
    
    console.log(`Successfully parsed ${experiences.length} experiences`)
    return experiences
  } catch (error) {
    console.error('Error fetching or parsing experiences data:', error)
    return []
  }
} 