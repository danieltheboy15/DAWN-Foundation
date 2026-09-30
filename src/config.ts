/**
 * Application Configuration & Form Integration Constants
 */

export const FORM_SUBMISSION_EMAIL = 'fatunsed@gmail.com';
export const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMISSION_EMAIL}`;

interface FormSubmitOptions {
  subject: string;
  replyTo?: string;
}

/**
 * Standardized form submission helper that posts to FormSubmit with clean formatting
 */
export async function submitToFormEndpoint(
  fields: Record<string, string | undefined>,
  options: FormSubmitOptions
): Promise<Response> {
  const payload: Record<string, string> = {
    ...Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined && v !== '')
    ) as Record<string, string>,
    _subject: options.subject,
    _captcha: 'false',
    _template: 'table'
  };

  if (options.replyTo && options.replyTo.includes('@')) {
    payload._replyto = options.replyTo.trim();
  }

  return fetch(FORM_SUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
