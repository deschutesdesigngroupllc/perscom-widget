'use server';

import Client from '@/lib/client';

/**
 * Submit a form
 *
 * @param {int} formId
 * @param {object} searchParams
 * @param {object} previousState
 * @param {FormData} formData
 * @returns {Promise<{success: boolean, finished: boolean, message: string}|{finished: boolean, error: boolean, message: (*|string)}>}
 */
export async function submitForm(formId, searchParams, previousState, formData) {
  let data = {};
  formData.forEach((value, key) => (data[key] = value));

  try {
    await new Client().postSubmission(formId, data);
  } catch (error) {
    return {
      finished: true,
      error: true,
      message:
        error.response?.error?.message ??
        error.message ??
        'There was an error with your form submission. Please try again.'
    };
  }

  return {
    finished: true,
    success: true,
    message: 'Your form has been successfully submitted.'
  };
}
