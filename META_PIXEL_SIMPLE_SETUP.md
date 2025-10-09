# Meta Pixel Implementation - Contact Tracking Focus

## 🎯 **What This Implementation Does:**

### **Events Tracked (Priority Order):**
1. **Contact** (HIGHEST PRIORITY) - Phone/WhatsApp/email clicks + contact form submissions
2. **ViewContent** (MEDIUM PRIORITY) - Contact section navigation clicks
3. **PageView** (LOWEST PRIORITY) - Standard page views for audience building

### **How Meta Uses These Events:**
- **Contact Events**: Meta learns from actual converters and finds similar users for your ads
- **ViewContent Events**: Shows interest level - helps with retargeting and audience building
- **PageView Events**: Builds your audience for lookalike audiences and broader targeting

## 🔧 **Setup Steps:**

### 1. **Get Your Meta Pixel ID**
- Go to [Facebook Business Manager](https://business.facebook.com)
- Navigate to Events Manager
- Create a new Pixel or use existing one
- Copy the Pixel ID (format: `1234567890123456`)

### 2. **Generate Access Token**
- Go to [Facebook Developer Console](https://developers.facebook.com)
- Create a new app or use existing one
- Generate an Access Token with these permissions:
  - `ads_management`
  - `business_management`
- Copy the Access Token (starts with `EAA...`)

### 3. **Get Test Event Code (Optional)**
- In Events Manager, go to Test Events
- Generate a Test Event Code for testing (format: `TEST12345`)
- Use this during development to verify events

### 4. **Environment Variables**
Add to your `.env.local` file:
```bash
# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=1334098041676931
META_ACCESS_TOKEN=EAAQC9WalTWgBPlU0mVSp2fg5IekByksKOefxcRjwicYi1kJ8nAdyiC7VdX4VRKfPJ9ZADlekWJjn3Tfc9xPcCMNXkMRZBTVOOx0XVeIhbpSIPQaIBxEd5ZAMLZCWxZAJ9ghIT9OVOzuUOJuFP29OG1wP9um9uwW1wOpuu2X5hUZCVwo0NSzfUdkNKYCIzj2ISNvAZDZD
META_TEST_EVENT_CODE=TEST68346
```

## 📊 **Implementation Features:**

### **What's Included:**
- **Meta Pixel Integration** - Client-side tracking with Facebook's official method
- **Conversions API** - Server-side tracking for better data quality
- **Event Deduplication** - Prevents double-counting of events
- **User Data Hashing** - Privacy-compliant data collection
- **Test Event Support** - Development testing with test event codes

### **Technical Implementation:**
- **Client-side**: Meta Pixel script loads and tracks events
- **Server-side**: Conversions API sends events directly to Meta
- **Deduplication**: Same event ID prevents double counting
- **Error Handling**: Graceful fallbacks if scripts are blocked

## 🧪 **Testing Your Implementation:**

### 1. **Check Configuration**
Visit: `http://localhost:3000/api/meta/events` (GET request)
Should return:
```json
{
  "status": "ok",
  "pixelId": "configured",
  "accessToken": "configured", 
  "testEventCode": "configured"
}
```

### 2. **Test Events**
- Use Facebook's Test Events tool in Events Manager
- Click your contact buttons and check if events appear
- Verify both Contact and ViewContent events are tracked
- Look for events with test code `TEST68346`

### 3. **Browser Testing**
- Install Facebook Pixel Helper Chrome extension
- Visit your website and check pixel detection
- Click contact elements and verify events fire
- Check browser console for any errors

## 🎯 **Service Types Updated:**
- `basic_website` - Simple websites
- `shopping_website` - E-commerce websites  
- `custom_website` - Custom web applications

## 🚀 **Ready for Ads:**

### **Your Implementation is Complete:**
✅ Meta Pixel initialized and tracking  
✅ Contact events prioritized (highest value)  
✅ Conversions API ready for server-side tracking  
✅ Test events configured for development  
✅ Production-ready with debug logs removed  

### **Next Steps:**
1. **Deploy to production** - Your website is ready
2. **Create Facebook Ad campaigns** - Target your website
3. **Set Contact as conversion goal** - Optimize for actual contact events
4. **Monitor performance** - Meta will learn and optimize automatically

## 🔍 **What to Monitor:**

### **In Facebook Ads Manager:**
- **Contact events** as your primary conversion goal
- **ViewContent events** for retargeting campaigns
- **PageView events** for audience building and lookalikes

### **Expected Performance:**
- **Week 1-2**: Meta learns your audience patterns
- **Week 3-4**: Ad performance improves as Meta optimizes
- **Month 2+**: Stable, optimized campaigns with better targeting

## 🛠 **Troubleshooting:**

### **Events Not Showing:**
- Check environment variables are correct
- Verify pixel ID and access token
- Check browser console for errors
- Use Facebook Pixel Helper extension

### **Ad Performance Issues:**
- Ensure Contact events are firing correctly
- Check if test event code is removed in production
- Monitor conversion tracking in Ads Manager
- Allow 2-4 weeks for Meta to optimize

### **Technical Issues:**
- Check API endpoint: `http://localhost:3000/api/meta/events`
- Verify Conversions API is working
- Check server logs for any errors
- Test with Facebook's Test Events tool
