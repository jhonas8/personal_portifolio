import { cache } from 'react'
import { GoogleCredentials, getGoogleAccessToken } from './google-auth'

export interface SheetData {
  values: string[][]
}

interface CacheEntry {
  data: SheetData
  timestamp: number
}

export class GoogleSheetsClient {
  private readonly credentials: GoogleCredentials | null
  private readonly spreadsheetId: string
  private cache: Record<string, CacheEntry> = {}
  private readonly cacheTimeMs: number = 3600000 // 1 hour in milliseconds

  constructor(cacheTimeMs = 3600000) {
    this.spreadsheetId = process.env.GOOGLE_EXSPREADSHEET_ID || ''
    this.cacheTimeMs = cacheTimeMs
    
    // Decode the base64-encoded credentials JSON
    try {
      const encodedCredentials = process.env.GOOGLE_API_KEY || ''
      if (!encodedCredentials) {
        console.warn('Google API key is not set. Set GOOGLE_API_KEY in .env.local')
        this.credentials = null
      } else {
        // Decode base64 to JSON string
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
        this.credentials = JSON.parse(decodedCredentials)
        console.log('Successfully decoded Google API credentials')
      }
    } catch (error) {
      console.error('Error decoding Google credentials:', error)
      this.credentials = null
    }
    
    if (!this.spreadsheetId) {
      console.warn('Google Spreadsheet ID is not set. Set GOOGLE_EXSPREADSHEET_ID in .env.local')
    }
  }

  /**
   * Check if a cached entry is still valid
   */
  private isCacheValid(key: string): boolean {
    if (!this.cache[key]) {
      return false
    }
    
    const now = Date.now()
    const entry = this.cache[key]
    
    return now - entry.timestamp < this.cacheTimeMs
  }

  /**
   * Get an access token using the service account credentials
   */
  private async getAccessToken(): Promise<string | null> {
    if (!this.credentials) {
      console.error('No credentials available to get access token')
      return null
    }

    try {
      // Use the improved auth module to get a token
      const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly'
      const token = await getGoogleAccessToken(this.credentials, scope)
      return token
    } catch (error) {
      console.error('Error getting access token:', error)
      return null
    }
  }

  /**
   * Fetch data from a specific sheet in the spreadsheet
   * @param sheetName The name of the sheet to fetch
   * @param forceRefresh Force a refresh ignoring cache if true
   * @returns The sheet data with rows and columns
   */
  async fetchSheet(sheetName: string, forceRefresh = false): Promise<SheetData> {
    // Check cache first (unless forced refresh)
    if (!forceRefresh && this.isCacheValid(sheetName)) {
      console.log(`Using cached data for sheet ${sheetName} (valid for ${Math.floor((this.cacheTimeMs - (Date.now() - this.cache[sheetName].timestamp)) / 60000)} more minutes)`)
      return this.cache[sheetName].data
    }
    
    console.log(`Fetching fresh data for sheet ${sheetName}...`)
    
    try {
      // Fallback to the public approach if credentials aren't available
      if (!this.credentials) {
        return this.fetchSheetPublic(sheetName)
      }
      
      // Get an access token for API access
      const accessToken = await this.getAccessToken()
      if (!accessToken) {
        console.warn('Could not get access token, falling back to public access')
        return this.fetchSheetPublic(sheetName)
      }
      
      // Use the Google Sheets API with proper authentication
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${sheetName}`
      
      console.log(`Making authenticated API request to Google Sheets API...`)
      
      const response = await fetch(url, {
        cache: 'no-store', // Don't use fetch's built-in cache, we're managing our own
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.error(`Google Sheets API error: ${response.status} ${response.statusText} - ${errorText}`)
        throw new Error(`Failed to fetch sheet data: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Cache the result with timestamp
      this.cache[sheetName] = { 
        data: { values: data.values || [] },
        timestamp: Date.now()
      }
      
      console.log(`Successfully fetched sheet ${sheetName} with ${data.values?.length || 0} rows (cached for ${Math.floor(this.cacheTimeMs / 60000)} minutes)`)
      return this.cache[sheetName].data
    } catch (error) {
      console.error(`Error in authenticated fetch for sheet ${sheetName}:`, error)
      console.log('Falling back to public access method...')
      return this.fetchSheetPublic(sheetName)
    }
  }
  
  /**
   * Fallback method to fetch public sheets
   */
  private async fetchSheetPublic(sheetName: string): Promise<SheetData> {
    console.log(`Trying public access for sheet ${sheetName}...`)
    
    try {
      // Use a simpler URL for public sheets - the direct export URL
      // This should work if the sheet is published to the web or shared publicly
      const url = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`
      
      console.log(`Making public API request to: ${url}`)
      
      const response = await fetch(url, { 
        cache: 'no-store' // Don't use fetch's built-in cache, we're managing our own
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data: ${response.statusText}`)
      }

      // The response is in a specific format: google.visualization.Query.setResponse({...})
      // We need to extract the JSON part
      const responseText = await response.text()
      const jsonStartIndex = responseText.indexOf('{')
      const jsonEndIndex = responseText.lastIndexOf('}')
      
      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error('Invalid response format from Google Sheets')
      }
      
      const jsonText = responseText.substring(jsonStartIndex, jsonEndIndex + 1)
      const parsedData = JSON.parse(jsonText)
      
      // Extract the actual table data
      const table = parsedData.table
      if (!table || !table.rows) {
        throw new Error('No table data found in response')
      }
      
      // Convert the visualization API format to our expected format
      const values = table.rows.map((row: any) => {
        return row.c.map((cell: any) => cell ? (cell.v || '') : '')
      })
      
      // Add the column labels as the first row
      if (table.cols) {
        const headers = table.cols.map((col: any) => col.label || '')
        values.unshift(headers)
      }
      
      // Verify the data
      console.log(`Processed public data with ${values.length} rows`)
      
      // Cache the result with timestamp
      this.cache[sheetName] = { 
        data: { values },
        timestamp: Date.now()
      }
      
      console.log(`Successfully cached sheet ${sheetName} data for ${Math.floor(this.cacheTimeMs / 60000)} minutes`)
      return this.cache[sheetName].data
    } catch (error) {
      console.error(`Error fetching public sheet ${sheetName}:`, error)
      return { values: [] }
    }
  }
  
  /**
   * Clear the cache for a specific sheet or all sheets
   */
  clearCache(sheetName?: string): void {
    if (sheetName) {
      delete this.cache[sheetName]
      console.log(`Cache cleared for sheet: ${sheetName}`)
    } else {
      this.cache = {}
      console.log('All cached data cleared')
    }
  }
}

// Create a singleton instance
export const googleSheetsClient = new GoogleSheetsClient()

/**
 * Get sheet data with React cache()
 * The cache function enhances server component rendering optimization
 * but we still need to manage the real data freshness with our own cache
 */
export const getSheetData = cache(async (sheetName: string, forceRefresh = false): Promise<SheetData> => {
  return await googleSheetsClient.fetchSheet(sheetName, forceRefresh)
})

/**
 * Helper function to manually clear the cache
 */
export function clearSheetCache(sheetName?: string): void {
  return googleSheetsClient.clearCache(sheetName)
} 