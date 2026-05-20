'use client';

import { useState, useTransition } from 'react';
import { submitContactForm } from '@/app/actions/submit-contact-form';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        });
        // Reset the form
        (e.target as HTMLFormElement).reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    });
  };

  return (
    <div className="@container/form rounded-lg border bg-card @md/form:p-6 p-4">
      <h3 className="mb-6 font-semibold @md/form:text-2xl text-xl">Send a Message</h3>

      {status.type && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm ${
            status.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}
        >
          {status.message}
        </div>
      )}

      <form className="@md/form:space-y-4 space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="mb-2 block font-medium @md/form:text-sm text-xs">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border bg-background @md/form:px-4 px-3 @md/form:py-2 py-1.5 @md/form:text-base text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-medium @md/form:text-sm text-xs">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border bg-background @md/form:px-4 px-3 @md/form:py-2 py-1.5 @md/form:text-base text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your.email@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block font-medium @md/form:text-sm text-xs">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full rounded-lg border bg-background @md/form:px-4 px-3 @md/form:py-2 py-1.5 @md/form:text-base text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-medium @md/form:text-sm text-xs">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full resize-none rounded-lg border bg-background @md/form:px-4 px-3 @md/form:py-2 py-1.5 @md/form:text-base text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tell me about your project..."
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-primary @md/form:px-6 px-4 @md/form:py-3 py-2 font-medium @md/form:text-base text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
