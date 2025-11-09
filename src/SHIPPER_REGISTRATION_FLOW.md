# Shipper Registration Flow - Complete Guide

## Overview
The shipper registration now supports **three distinct business types** with conditional fields based on the selected type.

---

## 🎯 Three Registration Types

### 1️⃣ Individual
**For:** Personal shipments and individual users

**Fields Required:**
- Full Name
- Age
- Gender (Male/Female/Other)
- Mobile Number (10 digits)

**Use Case:**
- Personal relocations
- Individual small shipments
- Non-commercial transport needs

---

### 2️⃣ Business Owner (NEW!)
**For:** Small businesses, proprietorships, sole traders

**Fields Required:**

**Section 1: Owner Information**
- Full Name
- Age
- Gender (Male/Female/Other)

**Section 2: Contact**
- Mobile Number (10 digits)

**Section 3: Business Details**
- GSTIN (Goods and Services Tax Identification Number)
- Business Address (Multi-line text area)

**Use Case:**
- Small business owners
- Proprietorships
- Self-employed traders
- Local businesses shipping goods

**Visual Design:**
- Divided into clear sections with separators
- Business Details section appears after mobile number
- Multi-line text area for business address

---

### 3️⃣ Company
**For:** Registered companies and corporations

**Fields Required:**

**Section 1: Company Information**
- Company Name
- Contact Person Name
- Email

**Section 2: Contact**
- Mobile Number (10 digits)

**Section 3: Legal Documents**
- GSTIN
- Incorporation Certificate (Upload)

**Use Case:**
- Pvt Ltd companies
- Public limited companies
- Large corporations
- Registered businesses with incorporation

**Visual Design:**
- Professional layout with document upload
- Legal documents section clearly separated
- Upload button for incorporation certificate

---

## 🎨 Visual Design Features

### Radio Button Selection Cards
Each business type is displayed as a selectable card with:

**Visual States:**
- **Unselected:** Gray border, white background
- **Hover:** Blue-tinted border, light blue background
- **Selected:** Blue border (2px), blue background (50% opacity)

**Card Content:**
- **Primary Text:** Business type name (translated)
- **Secondary Text:** Brief description in gray
  - Individual: "Personal shipments"
  - Business Owner: "Small business / proprietorship"
  - Company: "Registered company / corporation"

**Layout:**
```
┌─────────────────────────────────────────┐
│ ○ Individual                            │
│   Personal shipments                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ◉ Business Owner                        │  ← Selected
│   Small business / proprietorship       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ○ Company                               │
│   Registered company / corporation      │
└─────────────────────────────────────────┘
```

---

## 📋 Form Sections

All three types have **sectioned layouts** for better organization:

### Individual Flow:
1. **Business Type Selection** → Radio cards
2. **Personal Information** → Name, Age, Gender
3. **Contact** → Mobile Number
4. **Submit** → Continue to OTP

### Business Owner Flow:
1. **Business Type Selection** → Radio cards
2. **Owner Information** → Name, Age, Gender (with separator)
3. **Contact** → Mobile Number
4. **Business Details** → GSTIN, Business Address (with separator)
5. **Submit** → Continue to OTP

### Company Flow:
1. **Business Type Selection** → Radio cards
2. **Company Information** → Company Name, Contact Person, Email (with separator)
3. **Contact** → Mobile Number
4. **Legal Documents** → GSTIN, Incorporation Certificate (with separator)
5. **Submit** → Continue to OTP

---

## 🌍 Multilingual Support

All new fields are fully translated across 5 languages:

### New Translation Keys:

```typescript
selectShipperType: {
  en: 'Select Your Business Type',
  hi: 'अपना व्यवसाय प्रकार चुनें',
  bn: 'আপনার ব্যবসার ধরন নির্বাচন করুন',
  ta: 'உங்கள் வணிக வகையைத் தேர்ந்தெடுக்கவும்',
  ks: 'پننٕ کأروبأری قِسم ژھأرو',
}

businessOwner: {
  en: 'Business Owner',
  hi: 'व्यवसाय मालिक',
  bn: 'ব্যবসায় মালিক',
  ta: 'வணிக உரிமையாளர்',
  ks: 'کأروبأری مأکِن',
}

businessAddress: {
  en: 'Business Address',
  hi: 'व्यवसाय का पता',
  bn: 'ব্যবসার ঠিকানা',
  ta: 'வணிக முகவரி',
  ks: 'کأروبأری پتہ',
}

gstin: {
  en: 'GSTIN',
  hi: 'जीएसटीआईएन',
  bn: 'জিএসটিআইএন',
  ta: 'ஜிஎஸ்டிஐஎன்',
  ks: 'جی ایس ٹی آئی این',
}
```

---

## 🎨 Component Structure

### HTML Structure:
```tsx
<Card>
  {/* Header */}
  <h2>Shipper Registration</h2>
  
  {/* Business Type Selection */}
  <RadioGroup>
    <Card variant="selectable">Individual</Card>
    <Card variant="selectable">Business Owner</Card>
    <Card variant="selectable">Company</Card>
  </RadioGroup>
  
  {/* Conditional Fields Based on Selection */}
  {userType === 'individual' && <IndividualFields />}
  {userType === 'business' && <BusinessOwnerFields />}
  {userType === 'company' && <CompanyFields />}
  
  {/* Mobile Number (Common) */}
  <Input type="tel" />
  
  {/* Type-Specific Additional Fields */}
  {userType === 'business' && <BusinessDetailsFields />}
  {userType === 'company' && <LegalDocumentsFields />}
  
  {/* Submit Button */}
  <Button>Continue</Button>
</Card>
```

---

## 🔄 User Journey

### Scenario 1: Individual Shipper
```
1. Open app → Select Language
2. Choose "Shipper" role
3. Select "Individual" (default)
4. Fill: Name, Age, Gender
5. Enter mobile number
6. Click "Continue"
7. Verify OTP → Dashboard
```

### Scenario 2: Business Owner
```
1. Open app → Select Language
2. Choose "Shipper" role
3. Select "Business Owner" ⭐
4. Fill: Name, Age, Gender
5. Enter mobile number
6. Fill: GSTIN
7. Fill: Business Address (multi-line)
8. Click "Continue"
9. Verify OTP → Dashboard
```

### Scenario 3: Company
```
1. Open app → Select Language
2. Choose "Shipper" role
3. Select "Company"
4. Fill: Company Name, Contact Person, Email
5. Enter mobile number
6. Fill: GSTIN
7. Upload: Incorporation Certificate
8. Click "Continue"
9. Verify OTP → Dashboard
```

---

## 💡 Key Differences Between Types

| Feature | Individual | Business Owner | Company |
|---------|-----------|----------------|---------|
| Personal Details | ✅ Name, Age, Gender | ✅ Name, Age, Gender | ❌ Not required |
| Company Info | ❌ | ❌ | ✅ Company name, Contact person |
| GSTIN | ❌ | ✅ Required | ✅ Required |
| Business Address | ❌ | ✅ Text area | ❌ |
| Incorporation Cert | ❌ | ❌ | ✅ Upload required |
| Email | ❌ Optional | ❌ Optional | ✅ Required |

---

## 📱 Mobile UI Design

### Card Spacing:
- Padding: 24px (p-6)
- Border radius: 12px (rounded-xl)
- Shadow: xl with blue border

### Input Fields:
- Border radius: 12px (rounded-xl)
- Height: 40px (h-10)
- Full width with proper spacing

### Textarea (Business Address):
- Min height: 80px
- 3 rows default
- Auto-expanding
- Border radius: 12px

### Section Separators:
- Border-top with padding-top: 24px
- Light gray heading
- Margin bottom: 16px

---

## 🎯 Validation Rules

### Common for All:
- Mobile number: Exactly 10 digits, numeric only
- All required fields must be filled
- Proper format validation

### Business Owner Specific:
- GSTIN: 15 characters alphanumeric
- Business Address: Minimum 10 characters

### Company Specific:
- Email: Valid email format
- GSTIN: 15 characters alphanumeric
- Incorporation Certificate: PDF/Image file required

---

## 🔐 Data Structure

### Individual:
```typescript
{
  type: 'individual',
  name: string,
  age: number,
  gender: 'male' | 'female' | 'other',
  mobile: string (10 digits)
}
```

### Business Owner:
```typescript
{
  type: 'business',
  name: string,
  age: number,
  gender: 'male' | 'female' | 'other',
  mobile: string (10 digits),
  gstin: string (15 chars),
  businessAddress: string
}
```

### Company:
```typescript
{
  type: 'company',
  companyName: string,
  contactPerson: string,
  email: string,
  mobile: string (10 digits),
  gstin: string (15 chars),
  incorporationCertificate: File
}
```

---

## ✅ Benefits of New Flow

1. **Clarity:** Clear distinction between individual, business, and company
2. **Compliance:** Proper GSTIN collection for tax purposes
3. **Documentation:** Incorporation certificate for legal verification
4. **Flexibility:** Supports all shipper types from individuals to corporations
5. **User-Friendly:** Visual cards make selection intuitive
6. **Organized:** Sectioned layout prevents confusion
7. **Localized:** Full translation support for Indian market

---

## 🎨 Color Coding

- **Individual:** Blue theme (personal)
- **Business Owner:** Blue theme (small business)
- **Company:** Blue theme (corporate)

All use the shipper color palette:
- Primary: Blue-600 to Blue-700 gradient
- Accent: Blue-500
- Background: Blue-50
- Border: Blue-100

---

## 📊 Analytics Tracking

Suggested events to track:
1. `shipper_type_selected` - Track which type users choose
2. `business_gstin_entered` - Track business owner registrations
3. `company_document_uploaded` - Track company document submissions
4. `registration_completed_by_type` - Success rate per type

---

*Last Updated: November 2025*
