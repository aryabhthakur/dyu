"use client"

import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"
import {
    Checkbox
} from "@/components/ui/checkbox"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export const formSchema = z.object({
    name: z.string().min(1).min(2),
    email: z.string(),
    company: z.string().min(1).optional(),
    message: z.string().min(10),
    newsletter: z.boolean().default(true).optional()
});

export function Contactform() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })
    const [submitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage] = useState("")

    async function onSubmit(values: z.infer<typeof formSchema>) {



        console.log('====================================');
        console.log(values);
        console.log('====================================');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                {submitStatus === "error" && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {errorMessage || "Failed to submit your application. Please try again."}
                        </AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="aryabh"
                                    className="px-5 py-5 bg-white shadow-none"
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>What&apos;s your name?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="xyz@example.com"
                                    className="px-5 py-5 bg-white shadow-none"
                                    type="email"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Your contact email address</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ACME Inc"
                                    type="text"
                                    className="px-5 py-5 bg-white shadow-none"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Company you represent or work for</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="I want to know more about your AI platforms and how they can help my business."
                                    className="px-5 py-5 bg-white shadow-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Tell us how we can help?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-white p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}

                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Sign me up for the Newsletter</FormLabel>
                                <FormDescription>Get update regarding our platforms, or what&apos;s new we are building and more.</FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
