// Debug script to check environment variables
require('dotenv').config({ path: '.env.local' });
console.log('Environment variables after explicit loading:');
console.log('WISP_BLOG_ID:', process.env.WISP_BLOG_ID);
console.log('All environment variables:', process.env); 