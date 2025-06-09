"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { JobApplicationForm } from "@/components/job-application-form"
import {
    MapPin,
    Clock,
    Heart,
    Globe,
    Search,
    Filter,
    IndianRupee,
} from "lucide-react"

interface JobFromList {
    id: string
    title: string
    department: string
    location: string
    type: string
    summary: string
    requirements: string
    responsibilities: string
    perks: string
    createdAt: string
}

interface Department {
    id: string
    name: string
    count: number
}


export default function CareersPage() {
    const [jobs, setJobs] = useState<JobFromList[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [selectedJob, setSelectedJob] = useState<JobFromList | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState<string>("")
    const [selectedLocation, setSelectedLocation] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("")
    const [showApplicationForm, setShowApplicationForm] = useState(false)

    // Fetch jobs with filters
    const fetchJobs = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (searchTerm) params.append("search", searchTerm)
            if (selectedDepartment) params.append("department", selectedDepartment)
            if (selectedLocation) params.append("location", selectedLocation)
            if (selectedType) params.append("type", selectedType)

            const response = await fetch(`/api/jobs?${params.toString()}`)
            const result = await response.json()

            if (result.success) {
                setJobs(result.data.jobs)
            } else {
                console.error("Failed to fetch jobs:", result.error)
            }
        } catch (error) {
            console.error("Error fetching jobs:", error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch departments
    const fetchDepartments = async () => {
        try {
            const response = await fetch("/api/jobs/departments")
            const result = await response.json()

            if (result.success) {
                setDepartments(result.data)
            }
        } catch (error) {
            console.error("Error fetching departments:", error)
        }
    }

    useEffect(() => {
        fetchJobs()
        fetchDepartments()
    }, [])

    useEffect(() => {
        fetchJobs()
    }, [searchTerm, selectedDepartment, selectedLocation, selectedType])

    const handleJobClick = (job: JobFromList) => {
        setSelectedJob(job)
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedDepartment("")
        setSelectedLocation("")
        setSelectedType("")
    }

    const handleApplyClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedJob) {
            setShowApplicationForm(true)
        }
    }

    // Get unique locations and types from jobs
    const uniqueLocations = [...new Set(jobs.map((job) => job.location))]
    const uniqueTypes = [...new Set(jobs.map((job) => job.type))]

    return (
        <section className="min-h-screen relative z-10 pt-20 pb-40 dark:bg-neutral-900 rounded-t-4xl bg-accent">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 text-center py-16">
                <Badge className="text-sm mb-10">Job Openings</Badge>
                <h2 className="text-6xl font-medium"><span className="opacity-50">Join the</span> Team</h2>
                <h4 className="mt-4 max-w-96 mx-auto">At Dyu Technologies, we welcome fresh mindsets, new strategies, chill vibes and so on to drive the engine behind.</h4>
                <p className="flex flex-wrap w-fit mt-14 text-muted-foreground mx-auto gap-4 text-sm">
                    <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>Remote-First Culture</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>Comprehensive Benefits</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <span>Competitive Compensation</span>
                    </span>
                </p>
            </div>
            {/* Filters */}
            <div className="max-w-6xl mx-auto">
                <div className="border-2 border-neutral-200 dark:border-neutral-600 border-dashed rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Filter Jobs</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white"
                            />
                        </div>

                        {/* Department Filter */}
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map((dept) => (
                                    <SelectItem key={dept.id} value={dept.id}>
                                        {dept.name} ({dept.count})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Location Filter */}
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                {uniqueLocations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                        {location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Job Type Filter */}
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {uniqueTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Clear Filters */}
                    {(searchTerm || selectedDepartment || selectedLocation || selectedType) && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </div>

                {/* Results Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-medium">
                        {loading ? "Loading..." : `${jobs.length} Open Position${jobs.length !== 1 ? "s" : ""}`}
                    </h2>
                    <p className="text-muted-foreground">Discover opportunities to grow your career with us</p>
                </div>

                {/* Job Listings */}
                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i} className="border-0 shadow-none dark:bg-neutral-950">
                                <CardHeader>
                                    <Skeleton className="h-4 w-20 mb-2" />
                                    <Skeleton className="h-6 w-full mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                    <Skeleton className="h-10 w-full mt-4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
                        <Button variant="outline" onClick={clearFilters} className="mt-4">
                            Clear Filters
                        </Button>
                    </div>
                ) : (<>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                        {jobs.map((job) => (
                            <Card
                                key={job.id}
                                className="border-0 shadow-none dark:bg-neutral-950"
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="secondary" className="">{departments.filter(v => v.id === job.department)[0]?.name || ""}</Badge>
                                    </div>
                                    <CardTitle className="text-xl">{job.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{job.summary}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    <Button className="mt-4 cursor-pointer" onClick={() => handleJobClick(job)} size={"lg"}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <p className="text-center mt-28 text-sm max-w-lg mx-auto">
                        *Perks and benefits may vary by position and location. Please refer to the job description for specific details.
                    </p>
                </>

                )}
            </div>

            {/* Job Details Dialog */}
            <Dialog open={!!selectedJob && !showApplicationForm} onOpenChange={(open) => !open && setSelectedJob(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    {selectedJob && (
                        <>
                            <DialogHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="secondary">{departments.filter(v => v.id === selectedJob.department)[0].name || ""}</Badge>
                                </div>
                                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                                <DialogDescription className="text-muted-foreground">{selectedJob.summary}</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 mt-6">
                                {/* Job Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">{selectedJob.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm">{selectedJob.type}</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Requirements */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                                    <ul className="space-y-2">
                                        {selectedJob.requirements.split('\n').map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator />

                                {/* Responsibilities */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                                    <ul className="space-y-2">
                                        {selectedJob.responsibilities.split('\n').map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator />

                                {/* Perks */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Perks & Benefits</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedJob.perks.split('\n').map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Apply Button */}
                                <div className="flex gap-3 pt-4">
                                    <Button className="flex-1" onClick={handleApplyClick}>
                                        Apply Now
                                    </Button>
                                    <Button variant="outline" onClick={() => setSelectedJob(null)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Job Application Form */}
            {selectedJob && (
                <JobApplicationForm
                    job={selectedJob}
                    open={showApplicationForm}
                    onOpenChange={(open) => {
                        setShowApplicationForm(open)
                    }}
                />
            )}
        </section>
    )
}
