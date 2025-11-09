# Agency Registration Flow - Updated Guide

## Overview
The agency registration has been streamlined to focus on essential information and proper owner verification through government-issued ID documents.

---

## 🔄 What Changed

### ❌ Removed Fields:
1. **Agency Name** - Removed to simplify registration
2. **Business Proof** - Replaced with Owner ID verification

### ✅ Added Fields:
1. **Owner ID** - Government-issued identification document
   - Aadhaar
   - PAN Card
   - Voter ID
   - Driving License
   - Passport
   - Any other Government of India issued document

---

## 📋 Complete Registration Form

### Section 1: Agency Information
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Owner Name | Text | Yes | Min 3 characters |
| Fleet Size | Number | Yes | Min 1 vehicle |
| Mobile Number | Tel | Yes | Exactly 10 digits |
| Email | Email | Yes | Valid email format |

### Section 2: Owner Verification
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Owner ID | File Upload | Yes | Aadhaar, PAN, or any Govt. issued document |

---

## 🎨 Visual Design

### Form Layout:
```
┌──────────────────────────────────────────────┐
│  Agency Registration                         │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  Agency Information                          │
│                                              │
│  Owner Name                                  │
│  [________________________]                  │
│                                              │
│  Fleet Size                                  │
│  [________________________]                  │
│                                              │
│  Mobile Number                               │
│  [________________________]                  │
│                                              │
│  Email                                       │
│  [________________________]                  │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│  Owner Verification                          │
│                                              │
│  Owner ID                                    │
│  Aadhaar, PAN, or any Government issued...  │
│  [📤 Upload Owner ID Document        ]      │
│                                              │
│  [          Continue          ]              │
└──────────────────────────────────────────────┘
```

### Color Scheme:
- **Primary Color**: Orange (600-700 gradient)
- **Border**: Orange-100
- **Background**: White with orange tint
- **Text**: Orange-900 for headings, Gray-600 for labels

### Rounded Corners:
- All inputs: `rounded-xl` (12px)
- Card container: `rounded-xl` (12px)
- Button: `rounded-xl` (12px)

---

## 🌍 Multilingual Support

### Key Translations:

**Owner ID:**
- 🇬🇧 English: "Owner ID"
- 🇮🇳 Hindi: "मालिक आईडी"
- 🇧🇩 Bengali: "মালিক আইডি"
- 🇮🇳 Tamil: "உரிமையாளர் அடையாள அட்டை"
- 🇮🇳 Kashmiri: "مأکِن آئی ڈی"

**Owner ID Description:**
- 🇬🇧 English: "Aadhaar, PAN, or any Government issued document"
- 🇮🇳 Hindi: "आधार, पैन, या कोई सरकारी जारी दस्तावेज़"
- 🇧🇩 Bengali: "আধার, প্যান, বা যেকোনো সরকার জারি করা দলিল"
- 🇮🇳 Tamil: "ஆதார், பான், அல்லது அரசு வழங்கிய ஆவணம்"
- 🇮🇳 Kashmiri: "آدھار، پین، یا کأنٛہہ سرکأری جأری کردٕ دستاویز"

**Upload Owner ID:**
- 🇬🇧 English: "Upload Owner ID Document"
- 🇮🇳 Hindi: "मालिक आईडी दस्तावेज़ अपलोड करें"
- 🇧🇩 Bengali: "মালিক আইডি নথি আপলোড করুন"
- 🇮🇳 Tamil: "உரிமையாளர் அடையாள ஆவணத்தை பதிவேற்றவும்"
- 🇮🇳 Kashmiri: "مأکِن آئی ڈی دستاویز اپ لوڈ کرو"

---

## 📱 User Journey

### Step-by-Step Flow:

1. **Select Language** → Choose from 5 languages
2. **Select Role** → Choose "Agency"
3. **Registration Form Opens**
   
   **Section 1: Agency Information**
   - Enter Owner Name
   - Enter Fleet Size (number of vehicles)
   - Enter Mobile Number (10 digits)
   - Enter Email Address

   **Section 2: Owner Verification**
   - Click "Upload Owner ID Document"
   - Select file from device
   - Supported formats: PDF, JPG, PNG
   - Accepted documents:
     - ✅ Aadhaar Card
     - ✅ PAN Card
     - ✅ Voter ID Card
     - ✅ Driving License
     - ✅ Passport
     - ✅ Any Govt. of India issued ID

4. **Click "Continue"**
5. **OTP Verification Screen**
   - Enter 6-digit OTP sent to mobile
   - Verify and proceed

6. **Agency Dashboard** → Access to fleet management features

---

## 🔐 Accepted Government ID Documents

### Primary Documents:
1. **Aadhaar Card**
   - 12-digit unique identification
   - Most common for agency owners
   
2. **PAN Card**
   - Permanent Account Number
   - Required for tax purposes
   
3. **Voter ID Card**
   - Electoral Photo Identity Card
   - Proof of citizenship

### Secondary Documents:
4. **Driving License**
   - Valid transport license
   - Issued by RTO
   
5. **Passport**
   - Valid Indian passport
   - Photo page
   
6. **Other Government IDs**
   - Ration Card
   - Government Employee ID
   - Armed Forces ID
   - Any state-issued ID

---

## 📊 Data Structure

### Form Data Object:
```typescript
{
  type: 'agency',
  ownerName: string,
  fleetSize: number,
  mobile: string (10 digits),
  email: string,
  ownerIdDocument: File,
  ownerIdType: 'aadhaar' | 'pan' | 'voter_id' | 'dl' | 'passport' | 'other',
  verified: boolean
}
```

### Example:
```json
{
  "type": "agency",
  "ownerName": "Rajesh Kumar",
  "fleetSize": 15,
  "mobile": "9876543210",
  "email": "rajesh@transportagency.com",
  "ownerIdDocument": "aadhaar_rajesh.pdf",
  "ownerIdType": "aadhaar",
  "verified": true
}
```

---

## ✅ Validation Rules

### Field Validation:

| Field | Rule | Error Message |
|-------|------|---------------|
| Owner Name | Min 3 chars, letters only | "Enter valid owner name" |
| Fleet Size | Min 1, positive integer | "Enter valid fleet size" |
| Mobile | Exactly 10 digits, numeric | "Enter valid 10-digit mobile" |
| Email | Valid email format | "Enter valid email address" |
| Owner ID | File required, max 5MB | "Upload valid ID document" |

### File Upload Validation:
- **Accepted formats**: PDF, JPG, JPEG, PNG
- **Maximum size**: 5 MB
- **Minimum size**: 10 KB
- **Required**: Yes

---

## 🎯 Benefits of Updated Flow

### Simplified Registration:
1. ✅ **Fewer fields** - Only essential information
2. ✅ **Faster completion** - Less time to register
3. ✅ **Better verification** - Government ID ensures authenticity
4. ✅ **Legal compliance** - Proper owner identification
5. ✅ **Reduced friction** - No need for business proof separately

### Enhanced Security:
1. 🔒 **Verified Identity** - Government-issued IDs
2. 🔒 **Owner Accountability** - Clear ownership documentation
3. 🔒 **Fraud Prevention** - Harder to fake government IDs
4. 🔒 **Legal Traceability** - Easy to track registered agencies

---

## 🎨 Visual Components

### Section Separators:
```css
border-top: 1px solid #e5e7eb;
padding-top: 24px;
margin-top: 24px;
```

### Section Headers:
```css
font-size: 14px;
color: #4b5563;
font-weight: 500;
margin-bottom: 16px;
```

### Upload Button:
```css
width: 100%;
height: 40px;
border: 1px solid #d1d5db;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: flex-start;
padding: 0 16px;
background: white;
hover: background-color: #f9fafb;
```

### Owner ID Description:
```css
font-size: 12px;
color: #6b7280;
margin-bottom: 8px;
line-height: 1.5;
```

---

## 📱 Mobile Optimization

### Responsive Features:
- Full-width inputs on mobile
- Comfortable touch targets (min 44px)
- Proper keyboard types:
  - `type="tel"` for mobile number
  - `type="email"` for email
  - `type="number"` for fleet size
- Auto-focus on first field
- Smooth scrolling to errors

### File Upload on Mobile:
- Opens native file picker
- Camera option for direct photo capture
- Gallery access for existing photos
- Cloud storage integration

---

## 🔄 Comparison: Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| **Agency Name** | Required | ❌ Removed |
| **Owner Name** | Required | ✅ Required |
| **Fleet Size** | Required | ✅ Required |
| **Mobile** | Required | ✅ Required |
| **Email** | Required | ✅ Required |
| **Business Proof** | Upload required | ❌ Removed |
| **Owner ID** | Not required | ✅ Required (NEW) |
| **Total Fields** | 6 fields | 5 fields |
| **Uploads** | 1 (Business Proof) | 1 (Owner ID) |
| **Verification** | Business-focused | Owner-focused |

---

## 💡 Use Cases

### Small Transport Agency:
```
Owner: Mohan Lal
Fleet: 5 trucks
Mobile: 9876543210
Email: mohan@agency.com
Owner ID: Aadhaar Card
```

### Medium Agency:
```
Owner: Suresh Transport Services
Fleet: 25 trucks
Mobile: 9123456789
Email: suresh@transportservices.in
Owner ID: PAN Card
```

### Large Agency:
```
Owner: Nationwide Logistics
Fleet: 100+ trucks
Mobile: 9988776655
Email: info@nationwidelogistics.com
Owner ID: Incorporation + Director's ID
```

---

## 🎯 Success Metrics

### Registration Completion Rate:
- **Target**: 85%+ completion
- **Benefit**: Simplified form = higher completion

### Verification Success Rate:
- **Target**: 95%+ on first attempt
- **Benefit**: Clear ID requirements = better uploads

### Time to Complete:
- **Target**: < 3 minutes
- **Benefit**: Fewer fields = faster registration

---

*Last Updated: November 2025*
