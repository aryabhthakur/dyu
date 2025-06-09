"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle, Link } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
}

interface JobApplicationFormProps {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Salary ranges for the dropdown
const salaryRanges = [
  "Below 2 Lakh",
  "2 Lakh - 5 Lakh",
  "5 Lakh - 10 Lakh",
  "10 Lakh - 15 Lakh",
  "15 Lakh - 20 Lakh",
  "20 Lakh - 30 Lakh",
  "30 Lakh - 50 Lakh",
  "50 Lakh - 1 Crore",
  "Above 1 Crore",
]

// Years of experience options
const experienceOptions = ["0-1 years", "1-2 years", "2-3 years", "3-5 years", "5-7 years", "7-10 years", "10+ years"]

export function JobApplicationForm({ job, open, onOpenChange }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")

  const validateResumeUrl = (url: string): string | null => {
    if (!url) return null // URL is optional

    // Basic URL validation
    try {
      const parsedUrl = new URL(url)
      if (!parsedUrl.protocol.startsWith("http")) {
        return "URL must start with http:// or https://"
      }

      return null
    } catch {
      return "Please enter a valid URL"
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Validate resume URL if provided
    const urlError = validateResumeUrl(resumeUrl)
    if (urlError) {
      setSubmitStatus("error")
      setErrorMessage(urlError)
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData(e.currentTarget)

      // Add the resume URL to form data
      if (resumeUrl) {
        formData.append("resumeUrl", resumeUrl)
      }

      // Add the selected values to form data
      formData.append("yearsOfExperience", selectedExperience)
      formData.append("expectedSalary", selectedSalaryRange)

      const response = await fetch(`/api/jobs/${job.id}/apply`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application")
      }

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        if (submitStatus === "success") {
          onOpenChange(false)
          // Reset form state after dialog closes
          setTimeout(() => {
            setSubmitStatus("idle")
            setResumeUrl("")
            setSelectedExperience("")
            setSelectedSalaryRange("")
          }, 300)
        }
      }, 2000)
    } catch (error) {
      console.error("Application submission error:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Complete the form below to apply for this position at our {job.location} location.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for applying. We&apos;ve sent a confirmation email to your inbox. Our team will review your
              application and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errorMessage || "Failed to submit your application. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" required placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="(123) 456-7890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
                <Input id="linkedIn" name="linkedIn" placeholder="https://linkedin.com/in/johndoe" />
              </div>

              {/* Professional Information */}
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company (Optional)</Label>
                <Input id="currentCompany" name="currentCompany" placeholder="e.g., Google, Microsoft, Startup Inc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Salary Range *</Label>
                <Select value={selectedSalaryRange} onValueChange={setSelectedSalaryRange} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityDate">Available to Start *</Label>
                <Input
                  id="availabilityDate"
                  name="availabilityDate"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Resume URL Input */}
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume/CV URL (PDF)</Label>
              <div className="relative">
                <Input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  placeholder="https://example.com/your-resume.pdf"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="pl-10"
                />
                <Link className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Please provide a link to your resume in PDF format. You can use Google Drive, Dropbox, or any other file
                hosting service.
              </p>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                className="min-h-[120px]"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
