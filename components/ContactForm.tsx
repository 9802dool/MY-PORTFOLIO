'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically send the data to your backend
      // Example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-stone-200/90 bg-white/80 p-6 shadow-sm dark:border-stone-600 dark:bg-stone-850/80 sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-studio text-stone-600 dark:text-stone-400"
        >
          Name <span className="text-amber-700 dark:text-amber-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full border bg-white px-4 py-3 text-base text-stone-900 transition focus:border-amber-800 focus:outline-none focus:ring-1 focus:ring-amber-800 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-amber-500 dark:focus:ring-amber-500 ${
            errors.name
              ? 'border-amber-600 dark:border-amber-500'
              : 'border-stone-300 dark:border-stone-600'
          }`}
          placeholder="Your Name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-studio text-stone-600 dark:text-stone-400"
        >
          Email <span className="text-amber-700 dark:text-amber-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border bg-white px-4 py-3 text-stone-900 transition focus:border-amber-800 focus:outline-none focus:ring-1 focus:ring-amber-800 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-amber-500 dark:focus:ring-amber-500 ${
            errors.email
              ? 'border-amber-600 dark:border-amber-500'
              : 'border-stone-300 dark:border-stone-600'
          }`}
          placeholder="simeondoolarsingh@hotmail.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-studio text-stone-600 dark:text-stone-400"
        >
          Message <span className="text-amber-700 dark:text-amber-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full resize-none border bg-white px-4 py-3 text-base text-stone-900 transition focus:border-amber-800 focus:outline-none focus:ring-1 focus:ring-amber-800 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-amber-500 dark:focus:ring-amber-500 ${
            errors.message
              ? 'border-amber-600 dark:border-amber-500'
              : 'border-stone-300 dark:border-stone-600'
          }`}
          placeholder="Your message here..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-500">
          {formData.message.length} characters
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="border border-emerald-200/90 bg-emerald-50/90 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-900 dark:text-emerald-300">
            ✓ Thank you for your message! I'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="border border-amber-200/90 bg-amber-50/90 p-4 dark:border-amber-800/60 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            ✗ Something went wrong. Please try again later.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`min-h-[48px] w-full px-8 py-3 text-[11px] font-semibold uppercase tracking-studio transition ${
          isSubmitting
            ? 'cursor-not-allowed bg-stone-400 text-white dark:bg-stone-600'
            : 'bg-amber-800 text-white shadow-md hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}

