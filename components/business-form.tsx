"use client"

import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from 'sonner'
import { Camera } from 'lucide-react'
import { Business } from '@/types'
import { addBusiness, updateBusiness } from '@/services/business'


interface BusinessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  business?: Business | null
  children?: React.ReactNode
}

export function BusinessDialog({ 
  open, 
  onOpenChange, 
  business = null,
  children 
}: BusinessDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const logoInputRef = useRef<HTMLInputElement>(null)
    
    const [formData, setFormData] = useState<Business>({
        name: '',
        description: '',
        industry: '',
        logo: ''
    })

    useEffect(() => {
        if (business) {
        setFormData({
            name: business.name,
            description: business.description || '',
            industry: business.industry || '',
            logo: business.logo || ''
        })
        if (business.logo) setLogoPreview(business.logo)
        } else {
            resetForm()
        }
    }, [business])

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            industry: '',
            logo: ''
        })
        setLogoPreview(null)
        if (logoInputRef.current) logoInputRef.current.value = ''
    }

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setLogoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
        const formPayload = new FormData()
        formPayload.append('name', formData.name)
        if (formData.description) formPayload.append('description', formData.description)
        if (formData.industry) formPayload.append('industry', formData.industry)
        
        if (logoInputRef.current?.files?.[0]) {
            formPayload.append('logo', logoInputRef.current.files[0])
        }

        const method = business?._id ? 'PUT' : 'POST'
        let response;

        if(method === 'POST'){
            response = await addBusiness(formPayload)
        }else{
            response = await updateBusiness(formPayload)
        }

        if (response.status !== 200) {
            throw new Error("Network error")
        }
        // await response.json()
        toast.success(business?._id ? 'Business data updated!' : 'Business successfully created!')
        resetForm()
        } catch (error) {
            console.error('Error:', error)
            toast.error('Operation failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {business?._id ? 'Edit Business' : 'Create New Business'}
          </DialogTitle>
          <DialogDescription>
            {business?._id 
              ? 'Update your business information' 
              : 'Add a new business to your profile'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div 
                className="relative group cursor-pointer"
                onClick={() => logoInputRef.current?.click()}
              >
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage 
                    src={logoPreview || formData.logo || ''} 
                    alt="Business logo"
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {formData.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input
                type="file"
                ref={logoInputRef}
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Click on the logo to upload/change
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your business name"
                required
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Restaurant, Retail, etc."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your business"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>
              {isLoading ? (
                <>
                  {business?._id ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                business?._id ? 'Update Business' : 'Create Business'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}