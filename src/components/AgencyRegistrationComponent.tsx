import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card } from './ui/card';
import { Upload } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface AgencyRegistrationComponentProps {
  formData: any;
  updateFormData: (key: string, value: string) => void;
  setShowOTP: (show: boolean) => void;
  roleColor: string;
}

export function AgencyRegistrationComponent({ formData, updateFormData, setShowOTP, roleColor }: AgencyRegistrationComponentProps) {
  const { t } = useLanguage();
  const [agentType, setAgentType] = useState<'company' | 'individual' | 'union'>('company');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [unionIdFile, setUnionIdFile] = useState<File | null>(null);
  const [companyIdFile, setCompanyIdFile] = useState<File | null>(null);

  const handleIdProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdProofFile(e.target.files[0]);
      updateFormData('idProof', e.target.files[0].name);
    }
  };

  const handleUnionIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUnionIdFile(e.target.files[0]);
      updateFormData('unionIdProof', e.target.files[0].name);
    }
  };

  const handleCompanyIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyIdFile(e.target.files[0]);
      updateFormData('companyIdProof', e.target.files[0].name);
    }
  };
  
  return (
    <Card className="p-6 shadow-xl rounded-xl border-2 border-orange-100">
      <h2 className="mb-6 text-orange-900">{t('agencyRegistration')}</h2>
      
      <div className="space-y-6">
        {/* Agent Type Selection */}
        <div>
          <Label className="mb-3 block">{t('selectAgentType')}</Label>
          <RadioGroup value={agentType} onValueChange={(v: any) => setAgentType(v)} className="space-y-2">
            <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              agentType === 'company' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
            }`}>
              <RadioGroupItem value="company" id="company-agent" />
              <Label htmlFor="company-agent" className="cursor-pointer flex-1">
                <span className="block">{t('companyAgent')}</span>
                <span className="text-xs text-gray-500">{t('companyAgentDesc')}</span>
              </Label>
            </div>
            <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              agentType === 'individual' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
            }`}>
              <RadioGroupItem value="individual" id="individual-agent" />
              <Label htmlFor="individual-agent" className="cursor-pointer flex-1">
                <span className="block">{t('individualAgent')}</span>
                <span className="text-xs text-gray-500">{t('individualAgentDesc')}</span>
              </Label>
            </div>
            <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              agentType === 'union' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
            }`}>
              <RadioGroupItem value="union" id="union-rep" />
              <Label htmlFor="union-rep" className="cursor-pointer flex-1">
                <span className="block">{t('unionRepresentative')}</span>
                <span className="text-xs text-gray-500">{t('unionRepDesc')}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Common Fields */}
        <div className="border-t pt-6">
          <h4 className="text-sm text-gray-600 mb-4">{t('personalInformation')}</h4>
        </div>

        <div>
          <Label>{t('fullName')}</Label>
          <Input 
            value={formData.fullName || ''} 
            onChange={(e) => updateFormData('fullName', e.target.value)} 
            className="rounded-xl"
          />
        </div>

        <div>
          <Label>{t('mobileNumber')}</Label>
          <Input
            type="tel"
            maxLength={10}
            value={formData.mobile || ''}
            onChange={(e) => updateFormData('mobile', e.target.value.replace(/\D/g, ''))}
            className="rounded-xl"
          />
        </div>

        <div>
          <Label>{t('email')} (Optional)</Label>
          <Input 
            type="email" 
            value={formData.email || ''} 
            onChange={(e) => updateFormData('email', e.target.value)} 
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>{t('locationCity')}</Label>
            <Input 
              value={formData.city || ''} 
              onChange={(e) => updateFormData('city', e.target.value)} 
              className="rounded-xl"
            />
          </div>
          <div>
            <Label>{t('state')}</Label>
            <Input 
              value={formData.state || ''} 
              onChange={(e) => updateFormData('state', e.target.value)} 
              className="rounded-xl"
            />
          </div>
        </div>

        {/* ID Proof for Individual Agent */}
        {agentType === 'individual' && (
          <div>
            <Label>{t('ownerId')}</Label>
            <p className="text-xs text-gray-500 mb-2">{t('acceptedIds')}</p>
            <input
              id="idProofUpload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleIdProofUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => document.getElementById('idProofUpload')?.click()}
              className="w-full justify-start rounded-xl border-orange-200 hover:border-orange-500 hover:bg-orange-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {idProofFile ? idProofFile.name : t('uploadOwnerId')}
            </Button>
          </div>
        )}

        {/* Union ID Proof for Union Agent */}
        {agentType === 'union' && (
          <div>
            <Label>{t('unionIdOrIdProof')}</Label>
            <p className="text-xs text-gray-500 mb-2">{t('acceptedIds')}</p>
            <input
              id="unionAgentIdProofUpload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleIdProofUpload}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => document.getElementById('unionAgentIdProofUpload')?.click()}
              className="w-full justify-start rounded-xl border-orange-200 hover:border-orange-500 hover:bg-orange-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {idProofFile ? idProofFile.name : t('uploadUnionIdProof')}
            </Button>
          </div>
        )}

        {/* Company Agent Specific Fields */}
        {agentType === 'company' && (
          <>
            <div className="border-t pt-6">
              <h4 className="text-sm text-gray-600 mb-4">{t('companyInformation')}</h4>
            </div>

            <div>
              <Label>{t('firmName')}</Label>
              <Input 
                value={formData.firmName || ''} 
                onChange={(e) => updateFormData('firmName', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('gstBusinessRegNo')}</Label>
              <Input 
                value={formData.gstNumber || ''} 
                onChange={(e) => updateFormData('gstNumber', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('typeOfGoods')}</Label>
              <Input 
                value={formData.goodsType || ''} 
                onChange={(e) => updateFormData('goodsType', e.target.value)} 
                placeholder="e.g., Electronics, Agriculture, General Cargo"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('yearsInOperation')}</Label>
              <Input 
                type="number"
                min="0"
                value={formData.yearsOperation || ''} 
                onChange={(e) => updateFormData('yearsOperation', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm text-gray-600 mb-4">{t('agentVerification')}</h4>
            </div>

            <div>
              <Label>{t('designation')}</Label>
              <Input 
                value={formData.designation || ''} 
                onChange={(e) => updateFormData('designation', e.target.value)} 
                placeholder="e.g., Sales Manager, Operations Head, Branch Manager"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('companyIssuedIdProof')}</Label>
              <p className="text-xs text-gray-500 mb-2">{t('companyIdHelper')}</p>
              <input
                id="companyIdProofUpload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleCompanyIdUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('companyIdProofUpload')?.click()}
                className="w-full justify-start rounded-xl border-orange-200 hover:border-orange-500 hover:bg-orange-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {companyIdFile ? companyIdFile.name : t('uploadCompanyIssuedId')}
              </Button>
            </div>
          </>
        )}

        {/* Individual Agent Specific Fields */}
        {agentType === 'individual' && (
          <>
            <div className="border-t pt-6">
              <h4 className="text-sm text-gray-600 mb-4">Professional Details</h4>
            </div>

            <div>
              <Label>{t('yearsOfExperience')}</Label>
              <Input 
                type="number"
                min="0"
                value={formData.experience || ''} 
                onChange={(e) => updateFormData('experience', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('typeOfLoads')}</Label>
              <Input 
                value={formData.loadsType || ''} 
                onChange={(e) => updateFormData('loadsType', e.target.value)} 
                placeholder="e.g., Full Truck Load, Part Load, Express"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('referenceContact')}</Label>
              <Input 
                type="tel"
                maxLength={10}
                value={formData.referenceContact || ''} 
                onChange={(e) => updateFormData('referenceContact', e.target.value.replace(/\D/g, ''))} 
                className="rounded-xl"
              />
            </div>
          </>
        )}

        {/* Union Representative Specific Fields */}
        {agentType === 'union' && (
          <>
            <div className="border-t pt-6">
              <h4 className="text-sm text-gray-600 mb-4">Union Details</h4>
            </div>

            <div>
              <Label>{t('unionName')}</Label>
              <Input 
                value={formData.unionName || ''} 
                onChange={(e) => updateFormData('unionName', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('numberOfMembers')}</Label>
              <Input 
                type="number"
                min="0"
                value={formData.membersCount || ''} 
                onChange={(e) => updateFormData('membersCount', e.target.value)} 
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('operatingRegion')}</Label>
              <Input 
                value={formData.operatingRegion || ''} 
                onChange={(e) => updateFormData('operatingRegion', e.target.value)} 
                placeholder="e.g., North India, Maharashtra, Pan India"
                className="rounded-xl"
              />
            </div>

            <div>
              <Label>{t('unionIdProof')}</Label>
              <p className="text-xs text-gray-500 mb-2">{t('acceptedIds')}</p>
              <input
                id="unionIdProofUpload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleUnionIdUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('unionIdProofUpload')?.click()}
                className="w-full justify-start rounded-xl border-orange-200 hover:border-orange-500 hover:bg-orange-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {unionIdFile ? unionIdFile.name : t('unionIdProof')}
              </Button>
            </div>
          </>
        )}

        {/* Username and Password Section */}
        <div className="border-t pt-6">
          <h4 className="text-sm text-gray-600 mb-4">Account Credentials</h4>
        </div>

        <div>
          <Label>{t('username')}</Label>
          <Input
            type="text"
            placeholder={t('enterUsername')}
            value={formData.username || ''}
            onChange={(e) => updateFormData('username', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div>
          <Label>{t('password')}</Label>
          <Input
            type="password"
            placeholder={t('createPassword')}
            value={formData.password || ''}
            onChange={(e) => updateFormData('password', e.target.value)}
            className="rounded-xl"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center space-x-2 p-4 bg-orange-50 rounded-xl">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <Label htmlFor="terms" className="cursor-pointer text-sm">
            {t('termsConditions')}
          </Label>
        </div>

        <Button
          className={`w-full ${roleColor} rounded-xl shadow-lg`}
          onClick={() => setShowOTP(true)}
          disabled={
            !formData.fullName || 
            !formData.mobile || 
            formData.mobile.length !== 10 || 
            !formData.city || 
            !formData.state || 
            !idProofFile ||
            !formData.username || 
            !formData.password ||
            !agreedToTerms ||
            (agentType === 'union' && !unionIdFile)
          }
        >
          {t('continue')}
        </Button>
      </div>
    </Card>
  );
}
